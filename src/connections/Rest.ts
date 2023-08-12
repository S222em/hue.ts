import { CA } from '../hue/Hue';
import { Agent, request } from 'undici';
import { Collection } from '@discordjs/collection';
import { Limit } from './Limit';
import { Events } from '../hue/HueEvents';
import { APIError } from '../errors/APIError';
import { APITypeError } from '../errors/APITypeError';
import { APIResourceType } from '../api/ResourceType';
import { RESTDeleteResponse, RESTGetResponse, RESTPostResponse, RESTPutResponse } from '../api/Response';
import { RESTPostPayload, RESTPutPayload } from '../api/Payload';
import { Base } from '../structures/Base';

export interface Request {
	route: string;
	method: RESTRequestType;
	body?: Record<string, any>;
}

export interface Response extends Request {
	statusCode: number;
}

export enum RESTRequestType {
	Get = 'GET',
	Put = 'PUT',
	Post = 'POST',
	Delete = 'DELETE',
}

/**
 * Manages all requests to the API
 */
export class REST extends Base {
	/**
	 * Dispatcher to be used for requests
	 * Used for https server authentication
	 */
	public readonly dispatcher = new Agent({
		connect: {
			ca: CA,
			requestCert: true,
			rejectUnauthorized: false,
			checkServerIdentity: () => undefined,
		},
	});

	/**
	 * Limits for routes
	 */
	public readonly limits = new Collection<string, Limit>();

	/**
	 * Performs a get request to given route
	 * @param route
	 */
	public async get<TAPIResourceType extends APIResourceType>(
		route: string,
	): Promise<RESTGetResponse<TAPIResourceType>> {
		return await this._queue(route, RESTRequestType.Get);
	}

	/**
	 * Performs a put request to the API
	 * @param route
	 * @param payload
	 */
	public async put<TAPIResourceType extends APIResourceType>(
		route: string,
		payload: RESTPutPayload<TAPIResourceType>,
	): Promise<RESTPutResponse<TAPIResourceType>> {
		return await this._queue(route, RESTRequestType.Put, payload);
	}

	/**
	 * Performs a post request to the API
	 * @param route
	 * @param payload
	 */
	public async post<TAPIResourceType extends APIResourceType>(
		route: string,
		payload: RESTPostPayload<TAPIResourceType>,
	): Promise<RESTPostResponse<TAPIResourceType>> {
		return await this._queue(route, RESTRequestType.Post, payload);
	}

	/**
	 * Performs a delete request to the API
	 * @param route
	 */
	public async delete<TAPIResourceType extends APIResourceType>(
		route: string,
	): Promise<RESTDeleteResponse<TAPIResourceType>> {
		return await this._queue(route, RESTRequestType.Delete);
	}

	/**
	 * Queues the request
	 * Goes through requests at a route based interval to prevent rate-limiting
	 * @param route
	 * @param method
	 * @param payload
	 */
	public async _queue(route: string, method: RESTRequestType, payload?: Record<string, any>): Promise<any> {
		this.hue.emit(Events.Request, {
			route,
			method,
			body: payload,
		});

		const limit = this._getLimit(route);
		await limit.wait();

		const response = await request(`${this.hue._url}/clip/v2${route}`, {
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

		if (response.statusCode === 403) throw new APIError(`Invalid applicationKey`);

		const responseData = await response.body.json();

		if (![200, 201].includes(response.statusCode)) {
			const error = responseData?.errors?.[0]?.description;
			if (response.statusCode == 400) throw new APITypeError(error);
			throw new APIError(error);
		}

		this.hue.emit(Events.Response, {
			route,
			method,
			body: responseData,
			statusCode: response.statusCode,
		});

		limit.shift();

		return responseData;
	}

	/**
	 * Gets a limit
	 * Creates a new one if one does not yet exist
	 * @param route
	 */
	public _getLimit(route: string) {
		const sanitized = this._sanitizeRoute(route);

		return this.limits.ensure(sanitized, () => new Limit(sanitized));
	}

	/**
	 * Removes ID from the end of a route
	 * @param route
	 */
	public _sanitizeRoute(route: string) {
		// Remove possible resource ID from the route
		return route.replace(/\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/, '');
	}
}
