import { Manager } from './Manager';
import { SceneAction } from '../structures/SceneAction';
import Collection from '@discordjs/collection';
import type { Scene } from '../structures/Scene';
import { ApiSceneAction } from '../types/api/scene_action';

/**
 * Manager for scene actions
 */
export class SceneActionManager extends Manager<SceneAction> {
	/**
	 * The scene this manager belongs to
	 */
	public readonly scene: Scene;
	/**
	 * The cache of this manager
	 */
	public readonly cache: Collection<string, SceneAction>;

	constructor(scene: Scene) {
		super();
		this.scene = scene;
		this.cache = new Collection();
	}

	/**
	 * Adds or updates a scene action in the cache
	 * @param data
	 * @internal
	 */
	public _add(data: ApiSceneAction) {
		const sceneAction = this.cache.ensure(data.target.rid, () => new SceneAction(this.scene));
		sceneAction._patch(data);
		return sceneAction;
	}
}
