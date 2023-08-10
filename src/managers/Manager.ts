import { Collection } from '@discordjs/collection';
import { APIResourceType } from '../api/ResourceType';
import { NarrowResource } from '../structures/Resource';
import { Hue } from '../hue/Hue';
import { RESTGetResponseData } from '../api/Response';
import { RESTPostPayload, RESTPutPayload } from '../api/Payload';

export type ResourceConstructorSignature<T extends APIResourceType> = new (bridge: Hue, data: any) => NarrowResource<T>;

/**
 * Manages and caches resources
 */
export abstract class Manager<TAPIResourceType extends APIResourceType> {
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
	public readonly cache = new Collection<string, NarrowResource<TAPIResourceType>>();

	/**
	 * Type of the resource this manager holds
	 */
	public abstract type: APIResourceType;

	/**
	 * Class this manager holds
	 */
	public abstract holds: ResourceConstructorSignature<TAPIResourceType>;

	public constructor(hue: Hue) {
		this.hue = hue;
	}

	/**
	 * Adds a new resource to this managers cache
	 * @param data
	 */
	public _add(data: any): NarrowResource<TAPIResourceType> {
		const resource = new this.holds(this.hue, data);

		this.cache.set(data.id, resource);

		return resource;
	}

	/**
	 * Fetches a resource
	 * @param id
	 */
	public async fetch(id: string): Promise<NarrowResource<TAPIResourceType>> {
		const data = await this._get(id);

		return new this.holds(this.hue, data[0]);
	}

	/**
	 * Performs a get request to specified endpoint
	 * @param id
	 * @private
	 */
	public async _get(id: string): Promise<RESTGetResponseData<TAPIResourceType>> {
		const data = await this.hue._rest.get<TAPIResourceType>(`/resource/${this.type}/${id}`);

		return data.data;
	}

	/**
	 * Performs a put request to specified endpoint
	 * @param id
	 * @param payload
	 * @private
	 */
	public async _put(id: string, payload: RESTPutPayload<TAPIResourceType>): Promise<string> {
		const data = await this.hue._rest.put<TAPIResourceType>(`/resource/${this.type}/${id}`, payload);

		return data.data[0].rid;
	}

	/**
	 * Performs a post request to specified endpoint
	 * @param payload
	 * @private
	 */
	public async _post(payload: RESTPostPayload<TAPIResourceType>): Promise<string> {
		const data = await this.hue._rest.post<TAPIResourceType>(`/resource/${this.type}`, payload);

		return data.data[0].rid;
	}

	/**
	 * Performs a delete request to specified endpoint
	 * @param id
	 * @private
	 */
	public async _delete(id: string): Promise<string> {
		const data = await this.hue._rest.delete<TAPIResourceType>(`/resource/${this.type}/${id}`);

		return data.data[0].rid;
	}
}
