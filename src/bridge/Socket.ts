import type { Bridge } from './Bridge';
import { BridgeCA } from './Bridge';
import { Agent, Dispatcher, request } from 'undici';
import { EventStreamRoute } from '../routes/EventStream';
import BodyReadable from 'undici/types/readable';
import { Events } from '../util/Events';

/**
 * Event source for updates from the bridge
 * @internal
 */
export class Socket {
	private readonly bridge: Bridge;
	public dispatcher: Agent;
	public connected: boolean;
	public retries = 0;
	public connection: BodyReadable & Dispatcher.BodyMixin;

	constructor(bridge: Bridge) {
		this.bridge = bridge;
		this.dispatcher = new Agent({
			connect: {
				ca: bridge.options.ca || BridgeCA,
				requestCert: true,
				rejectUnauthorized: bridge.options.rejectUnauthorized ?? true,
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore this will be resolved with https://github.com/nodejs/undici/pull/1362
				checkServerIdentity: () => undefined,
			},
		});
	}

	public debug(message: string) {
		this.bridge.emit(Events.Debug, `[SSE] ${message}`);
	}

	public async connect() {
		const { body, statusCode } = await request(`https://${this.bridge.options.ip}:443${EventStreamRoute.getRoute()}`, {
			method: 'GET',
			headers: {
				'hue-application-key': this.bridge.options.applicationKey,
				Accept: 'text/event-stream',
			},
			bodyTimeout: 0,
			dispatcher: this.dispatcher,
		});

		if (statusCode === 200) {
			this.connected = true;
			this.debug('Connected');
			body.setEncoding('utf8');
			body.on('data', (raw) => this.onMessage(raw));
			body.on('error', (error) => this.onError(error));
			body.on('close', () => this.onDisconnect());
		}
	}

	public async onError(error: Error) {
		this.debug('Encountered error');
		this.bridge.emit(Events.Error, error.message);
	}

	public async onDisconnect() {
		this.debug('Disconnected');
		if (this.retries === 5) return this.bridge.emit(Events.Disconnect);
		this.retries += 1;

		this.connected = false;
		this.connection.destroy();

		await this.connect();
	}

	public async onMessage(raw: string) {
		if (raw === ': hi\n' + '\n') return this.debug('Hi');
		const data = this.parseRaw(raw);
		this.debug(`Received ${data.length} updates`);
		this.bridge.emit(Events.Raw, data);
		data.forEach((event) => {
			const deviceType = String(event.data[0].type).replace(/_/g, '');
			const eventType = String(event.type);

			const action = this.bridge.actions[deviceType + eventType];
			if (typeof action === 'function') action(this.bridge, event.data[0]);
		});
	}

	public parseRaw(raw: string): Array<Record<string, any>> {
		const regex = /id: \d+:\d+\ndata: /;

		const replaced = raw.replace(regex, '');

		return JSON.parse(replaced);
	}
}