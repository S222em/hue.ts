import { NamedResource, NamedResourceEditOptions } from './NamedResource';
import { APIResourceType } from '../api/ResourceType';
import { APIArcheType } from '../api/ArcheType';
import { Hue } from '../hue/Hue';
import { APIResource } from '../api/Resource';

export interface ArcheTypeResourceEditOptions extends NamedResourceEditOptions {
	archeType?: APIArcheType;
}

export type ArcheTypeResourceCreateOptions = Required<ArcheTypeResourceEditOptions>;

export abstract class ArcheTypeResource<
	TAPIResourceType extends APIResourceType,
> extends NamedResource<TAPIResourceType> {
	public data: APIResource<TAPIResourceType> & { metadata: { name: string; archetype: APIArcheType } };

	constructor(
		bridge: Hue,
		data: APIResource<TAPIResourceType> & { metadata: { name: string; archetype: APIArcheType } },
	) {
		super(bridge, data);
		this.data = data;
	}

	get archeType(): APIArcheType {
		return this.data.metadata.archetype;
	}

	public async setArcheType(archeType: APIArcheType): Promise<string> {
		return await this.edit({ archeType });
	}

	public abstract edit(options: ArcheTypeResourceEditOptions): Promise<string>;
}
