import { Collection } from '@discordjs/collection';
import { ResourceType, ResourceTypeGet, ResourceTypePost, ResourceTypePut } from '../api/ResourceType';
import { NarrowResource } from '../structures/Resource';
import { ResourceIdentifier } from '../api/ResourceIdentifier';
import { Hue } from '../hue/Hue';

export type By = string | ResourceIdentifier;

export type Force<B extends boolean, T extends ResourceType> = B extends true
	? NarrowResource<T>
	: NarrowResource<T> | undefined;

export type ResourceConstructorSignature<T extends ResourceType> = new (bridge: Hue, data: any) => NarrowResource<T>;

/**
 * Manages and caches resources
 */
export abstract class Manager<T extends ResourceType> {
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
	public readonly cache = new Collection<string, NarrowResource<T>>();

	/**
	 * Type of the resource this manager holds
	 */
	public abstract type: ResourceType;

	/**
	 * Class this manager holds
	 */
	public abstract holds: ResourceConstructorSignature<T>;

	public constructor(hue: Hue) {
		this.hue = hue;
	}

	/**
	 * Adds a new resource to this managers cache
	 * @param data Resource data from API
	 */
	public _add(data: any): NarrowResource<T> {
		const resource = new this.holds(this.hue, data);

		this.cache.set(data.id, resource);

		return resource;
	}

	/**
	 * Performs a get request to specified endpoint
	 * @param id ID of the resource
	 * @private
	 */
	public async _get(id: string): Promise<ResourceTypeGet<T>> {
		return await this.hue._rest.get(`/resource/${this.type}/${id}`);
	}

	/**
	 * Performs a put request to specified endpoint
	 * @param id ID of the resource
	 * @param data Resource data for API
	 * @private
	 */
	public async _put(id: string, data: ResourceTypePut<T>): Promise<ResourceIdentifier[]> {
		return await this.hue._rest.put(`/resource/${this.type}/${id}`, data);
	}

	/**
	 * Performs a post request to specified endpoint
	 * @param data Resource data for API
	 * @private
	 */
	public async _post(data: ResourceTypePost<T>): Promise<ResourceIdentifier[]> {
		return await this.hue._rest.post(`/resource/${this.type}`, data);
	}

	/**
	 * Performs a delete request to specified endpoint
	 * @param id ID of the resource
	 * @private
	 */
	public async _delete(id: string): Promise<ResourceIdentifier[]> {
		return await this.hue._rest.delete(`/resource/${this.type}/${id}`);
	}
}
