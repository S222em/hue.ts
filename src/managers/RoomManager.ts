import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { Room, RoomCreateOptions, RoomEditOptions } from '../structures/Room';
import { transformChildren, transformMetadataWithArcheType } from '../util/Transformers';

export class RoomManager extends Manager<ResourceType.Room> {
	type = ResourceType.Room;
	holds = Room;

	public async create(options: RoomCreateOptions): Promise<string | undefined> {
		const identifiers = await this._post({
			metadata: transformMetadataWithArcheType(options)!,
			children: transformChildren(options.children)!,
		});

		return identifiers?.[0]?.rid;
	}

	public async edit(id: string, options: RoomEditOptions): Promise<void> {
		await this._put(id, {
			metadata: transformMetadataWithArcheType(options),
			children: transformChildren(options.children),
		});
	}

	public async delete(id: string): Promise<void> {
		await this._delete(id);
	}
}
