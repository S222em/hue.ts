import type Collection from '@discordjs/collection';
import type { Resource } from '../structures/Resource';

export abstract class Manager<R extends string | (Resource<any> & { id: string })> {
	public abstract cache: Collection<string, any>;

	public resolve(resolvable: R) {
		if (typeof resolvable === 'string') {
			return (
				this.cache.get(resolvable) ||
				this.cache.find((value) => {
					return 'name' in value && value.name === resolvable;
				})
			);
		} else if (typeof resolvable === 'object') return this.cache.get(resolvable.id);
	}
}
