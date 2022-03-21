import { Resource } from './Resource';

export abstract class NamedResource<
	R extends object & { id?: string; metadata?: { name?: string } },
> extends Resource<R> {
	get name(): string {
		return this.data.metadata?.name;
	}

	public async setName(name: string) {
		return await this.edit({ name });
	}

	public abstract edit(options: Record<string, any> & { name?: string }): Promise<void>;
}
