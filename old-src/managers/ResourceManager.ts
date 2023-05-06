import type { Bridge } from '../bridge/Bridge';
import type { Resource } from '../structures/Resource';
import { Manager, ManagerOptions } from './Manager';
import { ApiResource } from '../types/api/resource';
import { Base } from '../structures/Base';
import { ApiReturnGet } from '../types/api/common';
import { Route } from '../bridge/rest/Route';

export interface ResourceManagerOptions<R extends Base<any>, D extends ApiResource> extends ManagerOptions<R, D> {
	route: Route;
}

export class ResourceManager<R extends Resource<any>, D extends ApiResource> extends Manager<R, D> {
	/**
	 * The bridge this manager belongs to
	 */
	public readonly bridge: Bridge;

	protected route: Route;

	public constructor(bridge: Bridge, options: ResourceManagerOptions<R, D>) {
		super(options);
		this.route = options.route;
		this.bridge = bridge;
	}

	/**
	 * Fetches a specific resource from the bridge
	 * @param id
	 * @internal
	 */
	public async fetch(id?: string): Promise<boolean | void> {
		const data = (await this.bridge.rest.get(id ? this.route : this.route.id(id))) as ApiReturnGet<D>;
		data.data.forEach((data: D) => {
			this._add(data);
		});
	}
}
