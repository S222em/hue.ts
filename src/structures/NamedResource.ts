import { Resource } from './Resource';

/**
 * Base for all named resources
 */
export abstract class NamedResource<
	R extends object & { id?: string; metadata?: { name?: string } },
> extends Resource<R> {
	/**
	 * The name of this resource
	 */
	get name(): string {
		return this.data.metadata?.name;
	}

	/**
	 * Edits the name of this resource
	 */
	public async setName(name: string) {
		return await this.edit({ name });
	}

	public abstract edit(options: Record<string, any> & { name?: string }): Promise<void>;
}
