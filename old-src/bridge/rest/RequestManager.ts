import { Bridge, BridgeCA } from '../Bridge';
import Collection from '@discordjs/collection';
import { RouteHandler } from './RouteHandler';
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

	public sanitizeRoute(route: string) {
		route.replace(/\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/, '');

		return route;
	}

	public async queueRequest(options: {
		method: 'GET' | 'PUT' | 'POST' | 'DELETE';
		route: string;
		data?: Record<string, any>;
	}) {
		const sanitizedRoute = this.sanitizeRoute(options.route);

		const handler = this.handlers.ensure(sanitizedRoute, () => new RouteHandler(this, sanitizedRoute));

		return await handler.queueRequest(options.route, {
			method: options.method,
			body: JSON.stringify(options.data),
			headers: {
				'hue-application-key': this.bridge.options.applicationKey,
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			dispatcher: this.dispatcher,
		});
	}
}
