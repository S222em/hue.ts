import { Bridge } from '../bridge/Bridge';
import Collection from '@discordjs/collection';
import { ApiResourceLike } from '../types/common';
import { ApiResourceType } from '../types/api/common';
import { Device } from '../structures/Device';
import { Room } from '../structures/Room';
import { Zone } from '../structures/Zone';
import { GroupedLight } from '../structures/GroupedLight';
import { Scene } from '../structures/Scene';
import { NarrowResource, Resource } from '../structures/Resource';
import { NormalLight } from '../structures/NormalLight';
import { NamedResource } from '../structures/NamedResource';

export class BridgeResourceManager {
	public bridge: Bridge;
	public cache = new Collection<string, Resource<any>>();

	constructor(bridge: Bridge) {
		this.bridge = bridge;
	}

	public resolve<T extends ApiResourceType>(resolvable: string | Resource<any>, type?: T): NarrowResource<T> {
		const cache = typeof resolvable !== 'string' ? resolvable : this._find(resolvable);

		if (!cache) return;
		if (type && !cache._isType(type)) return;

		return cache as NarrowResource<T>;
	}

	public resolveAll(resolvables: (string | Resource<any>)[]): Collection<string, Resource<any>> {
		const collection = new Collection<string, Resource<any>>();

		for (const resolvable of resolvables) {
			const cache = this.resolve(resolvable);
			collection.set(cache.id, cache);
		}

		return collection;
	}

	public resolveId<T extends ApiResourceType>(resolvable: string | Resource<any>, type?: T): string {
		const cache = typeof resolvable !== 'string' ? resolvable : this._find(resolvable);

		if (!cache) return;
		if (type && !cache._isType(type)) return;

		return cache?.id;
	}

	public async fetch<T extends ApiResourceType>(id: string, type: T): Promise<NarrowResource<T>> {
		const data = await this.bridge.rest.get(this._makeRoute(id, type));
		if (!data || !data.data || !data.data[0]) return null;

		return this._add(data.data[0]) as NarrowResource<T>;
	}

	public _find(resolvable: string) {
		return (
			this.cache.get(resolvable) ||
			this.cache.find((resource: NamedResource<any>) => 'name' in resource && resource.name === resolvable)
		);
	}

	public async _edit<T extends Resource<any>>(resource: T, data: T['data']): Promise<void> {
		await this.bridge.rest.put(this._makeRoute(resource), data);
	}

	public async _post<T extends Resource<any>>(resource: T, data: T['data']): Promise<void> {
		await this.bridge.rest.post(this._makeRoute(resource), data);
	}

	public async _delete<T extends Resource<any>>(resource: T): Promise<void> {
		await this.bridge.rest.delete(this._makeRoute(resource));
	}

	public _add(data: ApiResourceLike): Resource<any> {
		const structure = this._resolveType(data.type);
		if (!structure) return;

		const resource = new structure(this.bridge, data);
		this.cache.set(data.id, resource);
		return resource;
	}

	private _makeRoute(a: string | Resource<any>, b?: ApiResourceType): string {
		if (typeof a === 'string') return `/resource/${a}/${b}`;
		else return `/resource/${a.type}/${a.type}`;
	}

	private _resolveType<T extends ApiResourceType>(
		type: T,
	): new (bridge: Bridge, data: ApiResourceLike) => Resource<any> {
		switch (type) {
			case ApiResourceType.Device:
				return Device;
			case ApiResourceType.Room:
				return Room;
			case ApiResourceType.Zone:
				return Zone;
			case ApiResourceType.Light:
				// TODO add other light types
				return NormalLight;
			case ApiResourceType.GroupedLight:
				return GroupedLight;
			case ApiResourceType.Scene:
				return Scene;
			default:
				return;
		}
	}
}
