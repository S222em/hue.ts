import { Resource } from './Resource';
import { ApiResourceType } from '../api/ApiResourceType';

export abstract class NamedResource<T extends ApiResourceType> extends Resource<T> {
	get name(): string {
		return this.data.metadata.name;
	}

	public async setName(name: string): Promise<void> {
		await this.edit({ name });
	}

	public abstract edit(options: { name?: string }): Promise<void>;
}
