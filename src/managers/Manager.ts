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

export abstract class Manager<T extends ResourceType> {
	public readonly hue: Hue;
	public readonly cache = new Collection<string, NarrowResource<T>>();
	public abstract type: ResourceType;
	public abstract holds: ResourceConstructorSignature<T>;

	public constructor(hue: Hue) {
		this.hue = hue;
	}

	public _add(data: any): NarrowResource<T> {
		const resource = new this.holds(this.hue, data);

		this.cache.set(data.id, resource);

		return resource;
	}

	public async _get(id: string): Promise<ResourceTypeGet<T>> {
		return await this.hue._rest.get(`/resource/${this.type}/${id}`);
	}

	public async _put(id: string, data: ResourceTypePut<T>): Promise<ResourceIdentifier[]> {
		return await this.hue._rest.put(`/resource/${this.type}/${id}`, data);
	}

	public async _post(data: ResourceTypePost<T>): Promise<ResourceIdentifier[]> {
		return await this.hue._rest.post(`/resource/${this.type}`, data);
	}

	public async _delete(id: string): Promise<ResourceIdentifier[]> {
		return await this.hue._rest.delete(`/resource/${this.type}/${id}`);
	}
}
