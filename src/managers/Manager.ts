import type Collection from '@discordjs/collection';

export abstract class Manager<R extends Record<string, any>> {
	public abstract cache: Collection<string, R>;

	public resolve(resolvable: string | R): R {
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
