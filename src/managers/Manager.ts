import { Collection } from '@discordjs/collection';
import { ResourceType, ResourceTypeGet, ResourceTypePost, ResourceTypePut } from '../api/ResourceType';
import { NarrowResource } from '../structures/Resource';
import { ResourceIdentifier } from '../api/ResourceIdentifier';
import { Bridge } from '../bridge/Bridge';

export type By = string | ResourceIdentifier;

export type Force<B extends boolean, T extends ResourceType> = B extends true
	? NarrowResource<T>
	: NarrowResource<T> | undefined;

export type ResourceConstructorSignature<T extends ResourceType> = new (bridge: Bridge, data: any) => NarrowResource<T>;

export abstract class Manager<T extends ResourceType> {
	public readonly bridge: Bridge;
	public readonly cache = new Collection<string, NarrowResource<T>>();
	public abstract type: ResourceType;
	public abstract holds: ResourceConstructorSignature<T>;

	public constructor(bridge: Bridge) {
		this.bridge = bridge;
	}

	public _add(data: any): NarrowResource<T> {
		const resource = new this.holds(this.bridge, data);

		this.cache.set(data.id, resource);

		return resource;
	}

	public async _get(id: string): Promise<ResourceTypeGet<T>> {
		return await this.bridge.rest.get(`/resource/${this.type}/${id}`);
	}

	public async _put(id: string, data: ResourceTypePut<T>): Promise<void> {
		await this.bridge.rest.put(`/resource/${this.type}/${id}`, data);
	}

	public async _post(data: ResourceTypePost<T>): Promise<ResourceIdentifier[]> {
		return await this.bridge.rest.post(`/resource/${this.type}`, data);
	}

	public async _delete(id: string): Promise<void> {
		await this.bridge.rest.delete(`/resource/${this.type}/${id}`);
	}
}
