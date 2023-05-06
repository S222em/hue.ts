import { Bridge } from '../Bridge';
import { RequestManager } from './RequestManager';
import { ApiReturnDelete, ApiReturnGet, ApiReturnPost, ApiReturnPut } from '../../types/api/common';

/**
 * Manager for requests to the bridge
 * @internal
 */
export class REST {
	private bridge: Bridge;
	public manager: RequestManager;

	constructor(bridge: Bridge) {
		this.bridge = bridge;
		this.manager = new RequestManager(bridge);
	}

	public async get(route: string, data?: Record<string, any>): Promise<ApiReturnGet<any>> {
		return (await this.request('GET', route, data)) as ApiReturnGet<any>;
	}

	public async put(route: string, data?: Record<string, any>): Promise<ApiReturnPut<any>> {
		return (await this.request('PUT', route, data)) as ApiReturnPut<any>;
	}

	public async post(route: string, data?: Record<string, any>): Promise<ApiReturnPost<any>> {
		return (await this.request('POST', route, data)) as ApiReturnPost<any>;
	}

	public async delete(route: string, data?: Record<string, any>): Promise<ApiReturnDelete<any>> {
		return (await this.request('DELETE', route, data)) as ApiReturnDelete<any>;
	}

	public async request(method: 'GET' | 'PUT' | 'POST' | 'DELETE', route: string, data?: Record<string, any>) {
		return await this.manager.queueRequest({ method, route, data });
	}
}
