import Collection from '@discordjs/collection';
import { Base } from '../structures/Base';

export interface ManagerOptions<R extends Base<any>, D> {
	makeCache?: (this: Manager<R, D>, data: D) => R;
	getCache?: () => Collection<string, R>;
	resolveId?: (this: Manager<R, D>, data: D) => string;
	createCollection?: boolean;
}

export class Manager<R extends Base<any>, D extends Record<string, any>> {
	public cache: Collection<string, R>;
	protected makeCache: (this: Manager<R, D>, data: D) => R;
	protected resolveId: (this: Manager<R, D>, data: D) => string;

	constructor(options: ManagerOptions<R, D>) {
		if (typeof options.makeCache === 'function') this.makeCache = options.makeCache.bind(this);
		if (typeof options.getCache === 'function') Object.defineProperty(this, 'cache', { get: options.getCache });
		if (typeof options.resolveId === 'function') this.resolveId = options.resolveId.bind(this);
		if (options.createCollection) this.cache = new Collection();
	}

	/**
	 * Adds or updates a resource in the cache
	 * @param data
	 * @internal
	 */
	public _add(data: D): R {
		const id = typeof this.resolveId === 'function' ? this.resolveId(data) : data.id;

		const cache = this.cache.ensure(id, () => this.makeCache(data));

		cache._patch(data);

		return cache;
	}

	/**
	 * Resolves a resolvable to a resource
	 * @param resolvable
	 */
	public resolve(resolvable: string | R): R {
		if (typeof resolvable === 'string')
			return this.cache.find((r) => Reflect.get(r, 'name') === resolvable || Reflect.get(r, 'id') === resolvable);
		else if (typeof resolvable === 'object') return this.cache.get(Reflect.get(resolvable, 'id'));
	}
}
