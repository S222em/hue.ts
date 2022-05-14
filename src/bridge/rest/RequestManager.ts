import { Bridge, BridgeCA } from '../Bridge';
import Collection from '@discordjs/collection';
import { RouteHandler } from './RouteHandler';
import { Route } from './Route';
import { Agent } from 'undici';
import { Events } from '../../util/Events';

export class RequestManager {
	public bridge: Bridge;
	public handlers = new Collection<string, RouteHandler>();
	public dispatcher: Agent;

	constructor(bridge: Bridge) {
		this.bridge = bridge;
		this.dispatcher = new Agent({
			connect: {
				ca: this.bridge.options.ca || BridgeCA,
				requestCert: true,
				rejectUnauthorized: this.bridge.options.rejectUnauthorized ?? true,
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore this will be resolved with https://github.com/nodejs/undici/pull/1362
				checkServerIdentity: () => undefined,
			},
		});
	}

	public debug(message: string) {
		return this.bridge.emit(Events.Debug, `[REST] ${message}`);
	}

	public async queueRequest(method: 'GET' | 'PUT' | 'POST' | 'DELETE', route: Route, data?: Record<string, any>) {
		const handler = this.handlers.ensure(route.base, () => new RouteHandler(this, route));

		return await handler.queueRequest(route, {
			method,
			body: JSON.stringify(data),
			headers: {
				'hue-application-key': this.bridge.options.applicationKey,
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			dispatcher: this.dispatcher,
		});
	}
}
