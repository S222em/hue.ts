import { Resource } from './Resource';
import { APIResource, APIResourceType } from '../types/api';

export interface APINamedResource<T extends APIResourceType = APIResourceType> extends APIResource<T> {
	metadata: { name: string };
}

export interface NamedResourceEditOptions {
	name?: string;
}

export type NamedResourceCreateOptions = Required<NamedResourceEditOptions>;

/**
 * Represents any resource from the hue API that include a name
 */
export abstract class NamedResource<TData extends APINamedResource = APINamedResource> extends Resource<TData> {
	/**
	 * The name of this resource
	 */
	get name(): string {
		return this.data.metadata.name;
	}

	/**
	 * Sets the name of this resource
	 * @param name
	 */
	public async setName(name: string): Promise<string> {
		return await this.edit({ name });
	}

	public abstract edit(options: NamedResourceEditOptions): Promise<string>;
}
