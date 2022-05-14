import { AsyncQueue } from '@sapphire/async-queue';
import { RequestManager } from './RequestManager';
import { Dispatcher, request } from 'undici';
import { setTimeout as sleep } from 'node:timers/promises';
import { Route } from './Route';
import { Events } from '../../util/Events';
import { Util } from '../../util/Util';

export class RouteHandler {
	public manager: RequestManager;
	public route: Route;
	public asyncQueue = new AsyncQueue();
	public left: number;
	public intervalUntil: Date;

	constructor(manager: RequestManager, route: Route) {
		this.manager = manager;
		this.route = route;
		this.resetRateLimit();
	}

	public async queueRequest(
		route: Route,
		options?: { dispatcher?: Dispatcher } & Omit<Dispatcher.RequestOptions, 'origin' | 'path' | 'method'> &
			Partial<Pick<Dispatcher.RequestOptions, 'method'>>,
	): Promise<Record<string, any>> {
		await this.asyncQueue.wait();

		if (this.hasRateLimit()) {
			this.manager.bridge.emit(Events.RateLimited, this.intervalUntil, route);
			this.manager.debug(`Rate limited for route ${route.base} until ${Util.dateToString(this.intervalUntil)}`);
			await sleep(this.rateLimitEndsIn());
		}

		try {
			this.manager.bridge.emit(Events.ApiRequest, options, route);

			const response = await request(`https://${this.manager.bridge.options.ip}:443/clip/v2${route.route()}`, options);
			this.manager.bridge.emit(Events.ApiResponse, response, route);
			const data = await response.body.json();

			this.manager.debug(`Received response (status ${response.statusCode}) for request to ${route.route()}`);

			if (response.statusCode === 400) {
				throw new Error(data.errors[0].description);
			}
			if (response.statusCode === 200) return data;
		} finally {
			this.left -= 1;
			this.asyncQueue.shift();
		}
	}

	public hasRateLimit(): boolean {
		if (this.intervalUntil.getTime() <= Date.now()) this.resetRateLimit();
		return this.left === 0;
	}

	public rateLimitEndsIn(): number {
		return this.intervalUntil.getTime() - Date.now();
	}

	public resetRateLimit() {
		this.left = this.route.ratelimit.maxRequests;
		this.intervalUntil = new Date(Date.now() + this.route.ratelimit.perInterval * 1000);
	}
}
