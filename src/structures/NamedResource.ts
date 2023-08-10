import { APIResourceType } from '../api/ResourceType';
import { Hue } from '../hue/Hue';
import { Resource } from './Resource';
import { APIResource } from '../api/Resource';

export interface NamedResourceEditOptions {
	name?: string;
}

export type NamedResourceCreateOptions = Required<NamedResourceEditOptions>;

export abstract class NamedResource<TAPIResourceType extends APIResourceType> extends Resource<TAPIResourceType> {
	public data: APIResource<TAPIResourceType> & { metadata: { name: string } };

	constructor(bridge: Hue, data: APIResource<TAPIResourceType> & { metadata: { name: string } }) {
		super(bridge, data);
		this.data = data;
	}

	get name(): string {
		return this.data.metadata.name;
	}

	public async setName(name: string): Promise<string> {
		return await this.edit({ name });
	}

	public abstract edit(options: NamedResourceEditOptions): Promise<string>;
}
