import { Hue } from '../hue/Hue';
import { Agent, Dispatcher, request } from 'undici';
import BodyReadable from 'undici/types/readable';
import { Events } from '../hue/HueEvents';
import { RESOURCE_ADD, RESOURCE_DELETE, RESOURCE_UPDATE } from './events';

export class SSE {
	public readonly hue: Hue;
	public readonly dispatcher: Agent;
	public connection?: BodyReadable & Dispatcher.BodyMixin;

	constructor(hue: Hue) {
		this.hue = hue;
		this.dispatcher = new Agent({
			connect: {
				// ca: CA,
				// requestCert: true,
				rejectUnauthorized: false,
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore this will be resolved with https://github.com/nodejs/undici/pull/1362
				checkServerIdentity: () => undefined,
			},
			bodyTimeout: 0,
		});
	}

	public debug(message: string) {
		this.hue.emit(Events.Debug, `[SSE] ${message}`);
	}

	public async connect(): Promise<void> {
		const response = await request(`${this.hue._url}/eventstream/clip/v2`, {
			method: 'GET',
			headers: {
				Authorization:
					'accessToken' in this.hue.options.connection
						? `Bearer ${this.hue.options.connection.accessToken}`
						: undefined,
				'hue-application-key': this.hue.options.connection.applicationKey,
				Accept: 'text/event-stream',
			},
			dispatcher: this.dispatcher,
		});

		if (response.statusCode !== 200) return;

		this.debug('Connected');

		this.connection = response.body;
		this.connection.setEncoding('utf8');
		this.connection.on('error', this.onError.bind(this));
		this.connection.on('data', this.onData.bind(this));
	}

	public async onError(error: Error) {
		if ('code' in error && error.code === 'ETIMEDOUT') {
			this.debug('Disconnected, attempting reconnect');
			this.connection = undefined;

			await this.connect();
		}

		this.hue.emit(Events.Error, error);
	}

	public onData(data: string) {
		if (data === ': hi\n' + '\n') return this.debug('Hi');

		const events = this._parse(data);

		let queue: Array<(() => boolean) | undefined> = [];

		for (const event of events) {
			this.debug(`Received ${event.data.length} ${event.type} event(s)`);

			queue = [...this.onEvent(event), ...queue];
		}

		for (const emitter of queue) {
			if (typeof emitter === 'function') emitter();
		}

		this.hue.emit(Events.Raw, events);
	}

	public onEvent(event: Record<string, any>): Array<(() => boolean) | undefined> {
		const queue: Array<(() => boolean) | undefined> = [];

		for (const data of event.data) {
			queue.push(this.onEventData(event.type, data));
		}

		return queue;
	}

	public onEventData(type: string, data: Record<string, any>): (() => boolean) | undefined {
		let handler: ((data: any, hue: Hue) => (() => boolean) | undefined) | undefined;

		if (type == 'add') handler = RESOURCE_ADD[data.type];
		else if (type == 'delete') handler = RESOURCE_DELETE[data.type];
		else if (type == 'update') handler = RESOURCE_UPDATE[data.type];

		if (handler) return handler(data, this.hue);
	}

	public _parse(raw: string): Array<Record<string, any>> {
		const regex = /id: \d+:\d+\ndata: /;

		const replaced = raw.replace(regex, '');

		return JSON.parse(replaced);
	}
}
