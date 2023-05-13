import { Bridge, CA } from '../bridge/Bridge';
import { Agent, request } from 'undici';
import { Collection } from '@discordjs/collection';
import { Limit } from './Limit';
import { Events } from '../bridge/BridgeEvents';

export interface Request {
	route: string;
	method: RestRequestType;

	body?: Record<string, any>;
}

export interface Response extends Request {
	statusCode: number;
}

export enum RestRequestType {
	Get = 'GET',
	Put = 'PUT',
	Post = 'POST',
	Delete = 'DELETE',
}

export class Rest {
	public readonly bridge: Bridge;
	public readonly dispatcher: Agent;
	public readonly limits: Collection<string, Limit>;

	constructor(bridge: Bridge) {
		this.bridge = bridge;
		this.dispatcher = new Agent({
			connect: {
				ca: CA,
				requestCert: true,
				rejectUnauthorized: false,
				checkServerIdentity: () => undefined,
			},
		});
		this.limits = new Collection<string, Limit>();
	}

	public async get(route: string) {
		return await this._queue(route, RestRequestType.Get);
	}

	public async put(route: string, data: Record<string, any>) {
		return await this._queue(route, RestRequestType.Put, data);
	}

	public async post(route: string, data: Record<string, any>) {
		return await this._queue(route, RestRequestType.Post, data);
	}

	public async delete(route: string) {
		return await this._queue(route, RestRequestType.Delete);
	}

	private async _queue(route: string, method: RestRequestType, data?: Record<string, any>) {
		this.bridge.emit(Events.Request, {
			route,
			method,
			body: data,
		});

		const limit = this._getLimit(this._sanitizeRoute(route));

		await limit.wait();

		try {
			const { body, statusCode } = await request(`${this.bridge._url}/clip/v2${route}`, {
				method,
				body: data ? JSON.stringify(data) : null,
				headers: {
					Authorization:
						'accessToken' in this.bridge.options.connection
							? `Bearer ${this.bridge.options.connection.accessToken}`
							: undefined,
					'hue-application-key': this.bridge.options.connection.applicationKey,
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				dispatcher: this.dispatcher,
			});

			const responseData = await body.json();

			if (statusCode !== 200) throw new Error(`${responseData?.errors?.[0]?.description ?? 'unknown'}`);

			this.bridge.emit(Events.Response, {
				route,
				method,
				body: responseData,
				statusCode: statusCode,
			});

			return responseData.data;
		} finally {
			limit.shift();
		}
	}

	private _getLimit(route: string) {
		return this.limits.ensure(route, () => new Limit(this, route));
	}

	private _sanitizeRoute(route: string) {
		route.replace(/\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/, '');

		return route;
	}
}
