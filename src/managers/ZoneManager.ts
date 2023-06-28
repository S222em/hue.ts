import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { Zone, ZoneCreateOptions, ZoneEditOptions } from '../structures/Zone';
import { transformChildren, transformMetadataWithArcheType } from '../util/Transformers';

export class ZoneManager extends Manager<ResourceType.Zone> {
	type = ResourceType.Zone;
	holds = Zone;

	public async create(options: ZoneCreateOptions): Promise<string | undefined> {
		const identifiers = await this._post({
			metadata: transformMetadataWithArcheType(options)!,
			children: transformChildren(options.children)!,
		});

		return identifiers?.[0]?.rid;
	}

	public async edit(id: string, options: ZoneEditOptions): Promise<void> {
		await this._put(id, {
			metadata: transformMetadataWithArcheType(options),
			children: transformChildren(options.children),
		});
	}

	public async delete(id: string): Promise<void> {
		await this._delete(id);
	}
}
