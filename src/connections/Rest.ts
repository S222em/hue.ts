import { CA, Hue } from '../hue/Hue';
import { Agent, request } from 'undici';
import { Collection } from '@discordjs/collection';
import { Limit } from './Limit';
import { Events } from '../hue/HueEvents';

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
	public readonly hue: Hue;
	public readonly dispatcher: Agent;
	public readonly limits: Collection<string, Limit>;

	constructor(hue: Hue) {
		this.hue = hue;
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

	public async _queue(route: string, method: RestRequestType, data?: Record<string, any>) {
		this.hue.emit(Events.Request, {
			route,
			method,
			body: data,
		});

		const limit = this._getLimit(this._sanitizeRoute(route));

		await limit.wait();

		try {
			const { body, statusCode } = await request(`${this.hue._url}/clip/v2${route}`, {
				method,
				body: data ? JSON.stringify(data) : null,
				headers: {
					Authorization:
						'accessToken' in this.hue.options.connection
							? `Bearer ${this.hue.options.connection.accessToken}`
							: undefined,
					'hue-application-key': this.hue.options.connection.applicationKey,
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				dispatcher: this.dispatcher,
			});

			const responseData = await body.json();

			if (statusCode !== 200 && statusCode !== 201)
				throw new Error(`${responseData?.errors?.[0]?.description ?? 'unknown'}`);

			this.hue.emit(Events.Response, {
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

	public _getLimit(route: string) {
		return this.limits.ensure(route, () => new Limit(this, route));
	}

	public _sanitizeRoute(route: string) {
		// Remove possible resource ID from the route
		return route.replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/, '');
	}
}
