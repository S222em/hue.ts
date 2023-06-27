import { ResourceType, ResourceTypeGet } from '../api/ResourceType';
import { Hue } from '../hue/Hue';
import { ArcheType } from '../api/ArcheType';
import { Resource } from './Resource';

export interface NamedResourceEditOptions {
	name?: string;
}

export type NamedResourceCreateOptions = Required<NamedResourceEditOptions>;

export abstract class NamedResource<T extends ResourceType> extends Resource<T> {
	public data: ResourceTypeGet<T> & { metadata: { name: string; archetype: ArcheType } };

	constructor(bridge: Hue, data: ResourceTypeGet<T> & { metadata: { name: string; archetype: ArcheType } }) {
		super(bridge, data);
		this.data = data;
	}

	get name(): string {
		return this.data.metadata.name;
	}

	get archeType(): ArcheType {
		return this.data.metadata.archetype;
	}

	public async setName(name: string): Promise<void> {
		await this.edit({ name });
	}

	public async setArcheType(archeType: ArcheType): Promise<void> {
		await this.edit({ archeType });
	}

	public abstract edit(options: { name?: string; archeType?: ArcheType }): Promise<void>;
}
