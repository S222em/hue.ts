import { Resource } from './Resource';
import { ApiResourceType, ApiResourceTypeGet } from '../api/ApiResourceType';
import { Bridge } from '../bridge/Bridge';

export abstract class NamedResource<T extends ApiResourceType> extends Resource<T> {
	public data: ApiResourceTypeGet<T> & { metadata: { name: string } };

	constructor(bridge: Bridge, data: ApiResourceTypeGet<T> & { metadata: { name: string } }) {
		super(bridge, data);
		this.data = data;
	}

	get name(): string {
		return this.data.metadata.name;
	}

	public async setName(name: string): Promise<void> {
		await this.edit({ name });
	}

	public abstract edit(options: { name?: string }): Promise<void>;
}
