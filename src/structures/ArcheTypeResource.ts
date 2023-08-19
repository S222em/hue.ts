import { APINamedResource, NamedResource, NamedResourceEditOptions } from './NamedResource';
import { APIArcheType, APIResourceType } from '../types/api';

export interface APIArcheTypeResource<T extends APIResourceType = APIResourceType> extends APINamedResource<T> {
	metadata: {
		name: string;
		archetype: APIArcheType;
	};
}

export interface ArcheTypeResourceEditOptions extends NamedResourceEditOptions {
	archeType?: APIArcheType;
}

export type ArcheTypeResourceCreateOptions = Required<ArcheTypeResourceEditOptions>;

/**
 * Represents any resource from the hue API that include a name and archeType
 */
export abstract class ArcheTypeResource<
	TData extends APIArcheTypeResource = APIArcheTypeResource,
> extends NamedResource<TData> {
	/**
	 * The archetype of this resource
	 */
	get archeType(): APIArcheType {
		return this.data.metadata.archetype;
	}

	/**
	 * Sets the resources archeType (icon)
	 * @param archeType
	 *
	 * @example
	 * ```
	 * await resource.setArcheType(APIArcheType.ManCave);
	 * ```
	 */
	public async setArcheType(archeType: APIArcheType): Promise<string> {
		return await this.edit({ archeType });
	}

	public abstract edit(options: ArcheTypeResourceEditOptions): Promise<string>;
}
