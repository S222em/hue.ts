import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { Room, RoomCreateOptions } from '../structures/Room';
import { createResourceIdentifier } from '../util/resourceIdentifier';

export class RoomManager extends Manager<ResourceType.Room> {
	type = ResourceType.Room;
	_resourceClass = Room;

	public async create(options: RoomCreateOptions): Promise<string | undefined> {
		const identifiers = await this._post({
			metadata: { name: options.name, archetype: options.archeType },
			children: options.children?.map?.((child) => {
				return createResourceIdentifier(child, ResourceType.Light);
			}),
		});

		return identifiers[0]?.rid;
	}
}
