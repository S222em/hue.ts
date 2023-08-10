import { CA, Hue } from '../hue/Hue';
import { Agent, request } from 'undici';
import { Collection } from '@discordjs/collection';
import { Limit } from './Limit';
import { Events } from '../hue/HueEvents';
import { APIError } from '../errors/APIError';
import { APITypeError } from '../errors/APITypeError';
import { APIResourceType } from '../api/ResourceType';
import { RESTDeleteResponse, RESTGetResponse, RESTPostResponse, RESTPutResponse } from '../api/Response';
import { RESTPostPayload, RESTPutPayload } from '../api/Payload';

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

	public async get<TAPIResourceType extends APIResourceType>(
		route: string,
	): Promise<RESTGetResponse<TAPIResourceType>> {
		return await this._queue(route, RestRequestType.Get);
	}

	public async put<TAPIResourceType extends APIResourceType>(
		route: string,
		payload: RESTPutPayload<TAPIResourceType>,
	): Promise<RESTPutResponse<TAPIResourceType>> {
		return await this._queue(route, RestRequestType.Put, payload);
	}

	public async post<TAPIResourceType extends APIResourceType>(
		route: string,
		payload: RESTPostPayload<TAPIResourceType>,
	): Promise<RESTPostResponse<TAPIResourceType>> {
		return await this._queue(route, RestRequestType.Post, payload);
	}

	public async delete<TAPIResourceType extends APIResourceType>(
		route: string,
	): Promise<RESTDeleteResponse<TAPIResourceType>> {
		return await this._queue(route, RestRequestType.Delete);
	}

	public async _queue(route: string, method: RestRequestType, payload?: Record<string, any>): Promise<any> {
		this.hue.emit(Events.Request, {
			route,
			method,
			body: payload,
		});

		const limit = this._getLimit(route);
		await limit.wait();

		const { body, statusCode } = await request(`${this.hue._url}/clip/v2${route}`, {
			method,
			body: payload ? JSON.stringify(payload) : null,
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

		const possibleError = responseData?.errors?.[0]?.description;
		if (possibleError) {
			if (statusCode == 400) throw new APITypeError(possibleError);
			throw new APIError(possibleError);
		}

		this.hue.emit(Events.Response, {
			route,
			method,
			body: responseData,
			statusCode: statusCode,
		});

		limit.shift();

		return responseData;
	}

	public _getLimit(route: string) {
		const sanitized = this._sanitizeRoute(route);

		return this.limits.ensure(sanitized, () => new Limit(this, sanitized));
	}

	public _sanitizeRoute(route: string) {
		// Remove possible resource ID from the route
		return route.replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/, '');
	}
}
