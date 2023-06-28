import { Hue } from '../hue/Hue';
import { Agent, Dispatcher, request } from 'undici';
import BodyReadable from 'undici/types/readable';
import { Events } from '../hue/HueEvents';
import { RESOURCE_ADD, RESOURCE_DELETE, RESOURCE_UPDATE } from './events';

export class Sse {
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
		});
	}

	public debug(message: string) {
		this.hue.emit(Events.Debug, `[SSE] ${message}`);
	}

	public async connect(): Promise<void> {
		this.connection = undefined;

		const { body, statusCode } = await request(`${this.hue._url}/eventstream/clip/v2`, {
			method: 'GET',
			headers: {
				Authorization:
					'accessToken' in this.hue.options.connection
						? `Bearer ${this.hue.options.connection.accessToken}`
						: undefined,
				'hue-application-key': this.hue.options.connection.applicationKey,
				Accept: 'text/event-stream',
			},
			bodyTimeout: 0,
			dispatcher: this.dispatcher,
		});

		if (statusCode !== 200) return;

		this.connection = body;
		this.debug('Connected');
		body.setEncoding('utf8');
		body.on('data', (raw) => this.event(raw));
	}

	public async event(raw: string) {
		if (raw === ': hi\n' + '\n') return this.debug('Hi');
		const events = this._parse(raw);

		const queue: Array<(() => boolean) | undefined> = [];

		for (const event of events) {
			this.debug(`Received ${event.data.length} ${event.type} event(s)`);

			for (const data of event.data) {
				let handler: ((data: any, hue: Hue) => (() => boolean) | undefined) | undefined;

				if (event.type == 'add') handler = RESOURCE_ADD[data.type];
				else if (event.type == 'delete') handler = RESOURCE_DELETE[data.type];
				else if (event.type == 'update') handler = RESOURCE_UPDATE[data.type];

				if (handler) queue.push(handler(data, this.hue));
			}
		}

		for (const emitter of queue) {
			if (typeof emitter === 'function') emitter();
		}

		this.hue.emit(Events.Raw, events);
	}

	public _parse(raw: string): Array<Record<string, any>> {
		const regex = /id: \d+:\d+\ndata: /;

		const replaced = raw.replace(regex, '');

		return JSON.parse(replaced);
	}
}
