import { AsyncQueue } from '@sapphire/async-queue';
import { RequestManager } from './RequestManager';
import { Dispatcher, request } from 'undici';
import { setTimeout as sleep } from 'node:timers/promises';
import { Route } from '../../routes/Route';
import { Events } from '../../util/Events';

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
			await sleep(this.rateLimitEndsIn());
		}

		try {
			this.manager.bridge.emit(Events.ApiRequest, options, route);
			const response = await request(
				`https://${this.manager.bridge.options.ip}:443/clip/v2${route.getRoute()}`,
				options,
			);
			this.manager.bridge.emit(Events.ApiResponse, response, route);
			const data = await response.body.json();

			this.manager.debug(`Received response (status ${response.statusCode} for request to ${route.getRoute()}`);

			if (response.statusCode === 400) {
				throw new Error(data.errors[0].description);
			}
			if (response.statusCode === 200) return data;
		} finally {
			this.asyncQueue.shift();
		}
	}

	public hasRateLimit(): boolean {
		if (this.intervalUntil.getTime() <= Date.now()) this.resetRateLimit();
		return this.left === this.route.maxRequests;
	}

	public rateLimitEndsIn(): number {
		return this.intervalUntil.getTime() - Date.now();
	}

	public resetRateLimit() {
		this.left = this.route.maxRequests;
		this.intervalUntil = new Date(Date.now() + this.route.perInterval * 1000);
	}
}
