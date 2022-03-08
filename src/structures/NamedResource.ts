import { Resource } from './Resource';

export abstract class NamedResource<
	R extends object & { id: string; metadata?: { name?: string } },
> extends Resource<R> {
	get name(): string {
		return this.data.metadata?.name;
	}
}
