import { Collection } from '@discordjs/collection';
import { ApiResourceType } from '../api/ApiResourceType';
import { NarrowResource } from '../structures/Resource';
import { ResourceIdentifier } from '../api/ResourceIdentifier';
import { Bridge } from '../bridge/Bridge';

export type By = string | ResourceIdentifier | ResourceIdentifier[];

export type Force<B extends boolean, T extends ApiResourceType> = B extends true
	? NarrowResource<T>
	: NarrowResource<T> | undefined;

const ID_REGEX = /\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

export type ResourceConstructorSignature<T extends ApiResourceType> = new (
	bridge: Bridge,
	data: any,
) => NarrowResource<T>;

export abstract class Manager<T extends ApiResourceType> {
	public readonly bridge: Bridge;
	public readonly _cache = new Collection<string, NarrowResource<T>>();
	public abstract type: ApiResourceType;
	public abstract _resourceClass: ResourceConstructorSignature<T>;

	public constructor(bridge: Bridge) {
		this.bridge = bridge;
	}

	public find<B extends boolean>(by: By, force?: B): Force<B, T> {
		let resource;
		if (Array.isArray(by))
			resource = this._cache.get(by.find((identifier) => identifier.rtype == this.type)?.rid || '');
		else if (typeof by == 'string' && ID_REGEX.test(by)) resource = this._cache.get(by);
		else if (typeof by == 'object') resource = this._cache.find((resource) => resource && resource.id == by.rid);
		else resource = this._cache.find((resource) => 'name' in resource && resource.name == by);

		if (!resource && force) throw new Error(`Nonexistent resource: ${by}`);

		return resource as Force<B, T>;
	}

	public _create(data: any): NarrowResource<T> {
		const resource = new this._resourceClass(this.bridge, data);

		this._cache.set(data.id, resource);

		return resource;
	}
}
