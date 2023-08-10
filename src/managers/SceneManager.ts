import { Manager } from './Manager';
import { APIResourceType } from '../api/ResourceType';
import { Scene, SceneCreateOptions, SceneEditOptions } from '../structures/Scene';
import { transformMetadata, transformRecall, transformSceneActions } from '../util/Transformers';
import { createResourceIdentifier } from '../util/resourceIdentifier';
import { ifNotNull } from '../util/ifNotNull';

/**
 * Manages the scene resource
 */
export class SceneManager extends Manager<APIResourceType.Scene> {
	type = APIResourceType.Scene;
	holds = Scene;

	/**
	 * Creates a new scene
	 * @param groupId
	 * @param options
	 * @example
	 * ```
	 * await hue.scenes.create('some-id', {
	 *    name: 'Some awesome scene',
	 *    actions: [
	 *        {
	 *            id: 'some-lightId',
	 *            on: true,
	 *            brightness: 50,
	 *        }
	 *    ]
	 * });
	 * ```
	 */
	public async create(groupId: string, options: SceneCreateOptions): Promise<string | undefined> {
		const group = this.hue.zones.cache.get(groupId) ?? this.hue.rooms.cache.get(groupId);
		if (!group) return;

		const identifiers = await this._post({
			group: createResourceIdentifier(groupId, group.type),
			metadata: transformMetadata(options)!,
			actions: transformSceneActions(options.actions)!,
		});

		return identifiers?.[0]?.rid;
	}

	/**
	 * Edits specified scene
	 * @param id
	 * @param options
	 * @example
	 * ```
	 * await hue.scenes.edit('some-id', {
	 *    actions: [
	 *        {
	 *            id: 'some-lightId',
	 *            on: true,
	 *            brightness: 50,
	 *        }
	 *    ]
	 * });
	 * ```
	 */
	public async edit(id: string, options: SceneEditOptions): Promise<void> {
		await this._put(id, {
			metadata: transformMetadata(options),
			speed: ifNotNull(options.speed, () => options.speed),
			recall: transformRecall(options.recall),
			actions: transformSceneActions(options.actions),
		});
	}

	/**
	 * Deletes specified scene
	 * @param id
	 */
	public async delete(id: string): Promise<void> {
		await this._delete(id);
	}
}
