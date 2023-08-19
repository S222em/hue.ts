import { APIResource, APIResourceType } from '../types/api';
import { Resource } from '../structures/Resource';
import { Hue } from '../hue/Hue';
import { Collection } from '@discordjs/collection';
import { RESTPayload } from '../types/rest';

export interface FetchOptions {
	overwriteCache?: boolean;
}

/**
 * Manages and caches resources
 */
export abstract class ResourceManager<TResource extends Resource> {
	/**
	 * Owner of this manager
	 */
	public readonly hue: Hue;

	/**
	 * The cache of this manager
	 * @example Get resource from cache by ID
	 * ```
	 * const resource = manager.cache.get('some-id');
	 * ```
	 * @example Get resource from cache by name (not all resources have names)
	 * ```
	 * const resource = manager.cache.find((resource) => resource.name == 'Some cool name');
	 * ```
	 */
	public readonly cache = new Collection<string, TResource>();

	/**
	 * Type of the resource this manager holds
	 */
	public abstract type: APIResourceType;

	/**
	 * Class this manager holds
	 */
	public abstract holds: new (bridge: Hue, data: any) => TResource;

	public constructor(hue: Hue) {
		this.hue = hue;
	}

	/**
	 * Fetches a resource
	 * @param id
	 * @param options
	 *
	 * @example ```
	 * const id = await manager.create({ ... });
	 *
	 * const resource = await manager.fetch(id);
	 * ```
	 */
	public async fetch(id: string, options: FetchOptions = {}): Promise<TResource> {
		const data = await this._get(id);

		const resource = new this.holds(this.hue, data[0]);

		if (options.overwriteCache) this.cache.set(id, resource);

		return resource;
	}

	/**
	 * Adds a new resource to this managers cache
	 * @param data
	 * @private
	 */
	public _add(data: APIResource): TResource {
		const resource = new this.holds(this.hue, data);

		this.cache.set(data.id, resource);

		return resource;
	}

	/**
	 * Performs a get request to specified ID
	 * @param id
	 * @private
	 */
	public async _get(id: string): Promise<APIResource[]> {
		const data = await this.hue._rest.get(`/resource/${this.type}/${id}`);

		return data.data;
	}

	/**
	 * Performs a put request to specified ID
	 * @param id
	 * @param payload
	 * @private
	 */
	public async _put(id: string, payload: RESTPayload): Promise<string> {
		const data = await this.hue._rest.put(`/resource/${this.type}/${id}`, payload);

		return data.data[0].rid;
	}

	/**
	 * Performs a post request
	 * @param payload
	 * @private
	 */
	public async _post(payload: RESTPayload): Promise<string> {
		const data = await this.hue._rest.post(`/resource/${this.type}`, payload);

		return data.data[0].rid;
	}

	/**
	 * Performs a delete request to specified ID
	 * @param id
	 * @private
	 */
	public async _delete(id: string): Promise<string> {
		const data = await this.hue._rest.delete(`/resource/${this.type}/${id}`);

		return data.data[0].rid;
	}
}
