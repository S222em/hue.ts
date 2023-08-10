import { Manager } from './Manager';
import { APIResourceType } from '../api/ResourceType';
import { Room, RoomCreateOptions, RoomEditOptions } from '../structures/Room';
import { transformChildren, transformMetadataWithArcheType } from '../util/Transformers';

/**
 * Manages the room resource
 */
export class RoomManager extends Manager<APIResourceType.Room> {
	type = APIResourceType.Room;
	holds = Room;

	/**
	 * Creates a new room
	 * @param options
	 * @example
	 * ```
	 * await hue.rooms.create({
	 *    name: 'Attic',
	 *    archeType: ArcheType.Attic,
	 *    children: ['some-lightId-1', 'some-lightId-2'],
	 * });
	 * ```
	 */
	public async create(options: RoomCreateOptions): Promise<string | undefined> {
		const identifiers = await this._post({
			metadata: transformMetadataWithArcheType(options)!,
			children: transformChildren(options.children)!,
		});

		return identifiers?.[0]?.rid;
	}

	/**
	 * Edits specified room
	 * @param id
	 * @param options
	 * @example
	 * ```ts
	 * await hue.rooms.edit('some-id', {
	 *    name: 'New name',
	 * });
	 * ```
	 */
	public async edit(id: string, options: RoomEditOptions): Promise<void> {
		await this._put(id, {
			metadata: transformMetadataWithArcheType(options),
			children: transformChildren(options.children),
		});
	}

	/**
	 * Deletes specified room
	 * @param id
	 */
	public async delete(id: string): Promise<void> {
		await this._delete(id);
	}
}
