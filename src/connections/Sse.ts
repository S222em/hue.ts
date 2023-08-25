import { CA, Hue } from '../hue/Hue';
import { Agent, Dispatcher, request } from 'undici';
import BodyReadable from 'undici/types/readable';
import { Events } from '../hue/HueEvents';
import { RESOURCE_ADD_ACTION, RESOURCE_DELETE_ACTION, RESOURCE_UPDATE_ACTION } from '../actions';
import { Base } from '../structures/Base';

/**
 * Provides the SSE connection with the hue system
 */
export class SSE extends Base {
	/**
	 * Dispatcher to be used for the connection
	 * Used for https server authentication
	 */
	public readonly dispatcher = new Agent({
		connect: {
			ca: CA,
			requestCert: true,
			rejectUnauthorized: false,
			checkServerIdentity: () => undefined,
		},
		bodyTimeout: 0,
	});

	/**
	 * The connection with the hue system
	 */
	public connection?: BodyReadable & Dispatcher.BodyMixin;

	/**
	 * Emits a prefixed debug message
	 * @param message
	 */
	public debug(message: string) {
		this.hue.emit(Events.Debug, `[SSE] ${message}`);
	}

	/**
	 * Connects to the hue system
	 */
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

	/**
	 * Closes the connection to the hue system
	 */
	public close(): void {
		this.connection?.destroy();
	}

	/**
	 * Used for handling errors on the connection
	 * @param error
	 */
	public async onError(error: Error) {
		if ('code' in error && error.code === 'ETIMEDOUT') {
			this.debug('Disconnected, attempting reconnect');
			this.connection = undefined;

			await this.connect();
		}

		this.hue.emit(Events.Error, error);
	}

	/**
	 * Handles data packets from hue server
	 * @param data
	 */
	public onData(data: string) {
		if (data === ': hi\n' + '\n') return this.debug('Hi');

		const events = this._parse(data);

		let queue: Array<(() => boolean) | undefined> = [];

		for (const event of events) {
			this.debug(`Received ${event.data.length} ${event.type} event(s)`);

			queue = [...this.onEvent(event), ...queue];
		}

		//Emits all the processed actions
		//In case this is not delayed until every event is processed there might be missing cache
		//For example, creating a room also creates a groupedLight
		//If the creation of the room is emitted first, the groupedLight resource belonging to it will be missing
		for (const emitter of queue) {
			if (typeof emitter === 'function') emitter();
		}

		this.hue.emit(Events.Raw, events);
	}

	/**
	 * Handles a event type (add, update, delete)
	 * @param event
	 */
	public onEvent(event: Record<string, any>): Array<(() => boolean) | undefined> {
		const queue: Array<(() => boolean) | undefined> = [];

		for (const data of event.data) {
			queue.push(this.onEventData(event.type, data));
		}

		return queue;
	}

	/**
	 * Handles data inside a event type
	 * @param type
	 * @param data
	 */
	public onEventData(type: string, data: Record<string, any>): (() => boolean) | undefined {
		let handler: ((data: any, hue: Hue) => (() => boolean) | undefined) | undefined;

		if (type == 'add') handler = RESOURCE_ADD_ACTION[data.type];
		else if (type == 'delete') handler = RESOURCE_DELETE_ACTION[data.type];
		else if (type == 'update') handler = RESOURCE_UPDATE_ACTION[data.type];

		if (handler) return handler(data, this.hue);
	}

	/**
	 * Parses data recieved from the stream
	 * @param raw
	 */
	public _parse(raw: string): Array<Record<string, any>> {
		const regex = /id: \d+:\d+\ndata: /;

		const replaced = raw.replace(regex, '');

		return JSON.parse(replaced);
	}
}
