import { Manager } from './Manager';
import { SceneAction } from '../structures/SceneAction';
import type { Scene } from '../structures/Scene';
import { ApiSceneAction } from '../types/api/scene_action';

/**
 * Manager for scene actions
 */
export class SceneActionManager extends Manager<SceneAction, ApiSceneAction> {
	/**
	 * The scene this manager belongs to
	 */
	public readonly scene: Scene;

	constructor(scene: Scene) {
		super({ createCollection: true, makeCache: () => new SceneAction(scene), resolveId: (data) => data.target.rid });
		this.scene = scene;
	}
}
