import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { Zone, ZoneCreateOptions } from '../structures/Zone';
import { createResourceIdentifier } from '../util/resourceIdentifier';

export class ZoneManager extends Manager<ResourceType.Zone> {
	type = ResourceType.Zone;
	_resourceClass = Zone;

	public async create(options: ZoneCreateOptions): Promise<string | undefined> {
		const identifiers = await this._post({
			metadata: { name: options.name, archetype: options.archeType },
			children: options.children?.map?.((child) => {
				return createResourceIdentifier(child, ResourceType.Light);
			}),
		});

		return identifiers?.[0]?.rid;
	}
}
