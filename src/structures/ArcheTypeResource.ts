import { NamedResource, NamedResourceEditOptions } from './NamedResource';
import { ResourceType, ResourceTypeGet } from '../api/ResourceType';
import { ArcheType } from '../api/ArcheType';
import { Bridge } from '../bridge/Bridge';

export interface ArcheTypeResourceEditOptions extends NamedResourceEditOptions {
	archeType?: ArcheType;
}

export type ArcheTypeResourceCreateOptions = Required<ArcheTypeResourceEditOptions>;

export abstract class ArcheTypeResource<T extends ResourceType> extends NamedResource<T> {
	public data: ResourceTypeGet<T> & { metadata: { name: string; archetype: ArcheType } };

	constructor(bridge: Bridge, data: ResourceTypeGet<T> & { metadata: { name: string; archetype: ArcheType } }) {
		super(bridge, data);
		this.data = data;
	}

	get archeType(): ArcheType {
		return this.data.metadata.archetype;
	}

	public async setArcheType(archeType: ArcheType): Promise<void> {
		await this.edit({ archeType });
	}

	public abstract edit(options: { name?: string; archeType?: ArcheType }): Promise<void>;
}
