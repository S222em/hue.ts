import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Collection from '@discordjs/collection';
import { RouteRateLimit } from './RouteRateLimit';
import { Routes } from '../../util/Routes';
import { Agent } from 'https';

export class Rest {
	public handlers = new Collection<string, RouteRateLimit>();
	public manager: AxiosInstance;

	constructor(ip: string, applicationKey: string) {
		const manager = axios.create({
			baseURL: Routes.base(ip),
			headers: {
				'hue-application-key': applicationKey,
			},
			httpsAgent: new Agent({ rejectUnauthorized: false }),
		});

		manager.interceptors.request.use(this.handleRequest.bind(this));
		manager.interceptors.response.use(this.handleResponse.bind(this));

		this.manager = manager;
	}

	public static getRoute(url: string) {
		const route = url.split('/');
		return route.slice(0, 3).join('/');
	}

	public async get(url: string, data?: Record<string, any>) {
		return await this.manager.get(url, data);
	}

	public async put(url: string, data?: Record<string, any>) {
		return await this.manager.put(url, data);
	}

	public async post(url: string, data?: Record<string, any>) {
		return await this.manager.post(url, data);
	}

	public async delete(url: string, data?: Record<string, any>) {
		return await this.manager.delete(url, data);
	}

	public handleRequest(request: AxiosRequestConfig) {
		const route = Rest.getRoute(request.url);
		const handler = this.handlers.ensure(route, () => new RouteRateLimit(route));
		return new Promise((resolve) => {
			handler.queueRequest(() => resolve(request));
		});
	}

	public handleResponse(response: AxiosResponse) {
		const route = Rest.getRoute(response.config.url);
		this.handlers.get(route).next();
		return response;
	}
}
