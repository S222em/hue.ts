import { ResourceManager } from './ResourceManager';
import { APIResourceType } from '../types/api';
import { Scene, SceneCreateOptions, SceneEditOptions } from '../structures/Scene';
import { createScenePostPayload, createScenePutPayload } from '../payloads/scenePayload';

/**
 * Manages the scene resource
 */
export class SceneManager extends ResourceManager<Scene> {
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
	public async create(groupId: string, options: SceneCreateOptions): Promise<string> {
		const group = this.hue.zones.cache.get(groupId) ?? this.hue.rooms.cache.get(groupId)!;

		return await this._post(createScenePostPayload(group.identifier, options));
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
	public async edit(id: string, options: SceneEditOptions): Promise<string> {
		return await this._put(id, createScenePutPayload(options));
	}

	/**
	 * Deletes specified scene
	 * @param id
	 */
	public async delete(id: string): Promise<string> {
		return await this._delete(id);
	}
}
