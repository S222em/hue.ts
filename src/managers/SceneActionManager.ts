import { BaseManager } from './BaseManager';
import { SceneAction } from '../structures/SceneAction';
import type { Scene } from '../structures/Scene';
import type { ApiSceneAction } from '../types/api';

export class SceneActionManager extends BaseManager<SceneAction> {
	private scene: Scene;

	constructor(scene: Scene) {
		super(scene.bridge);
		this.scene = scene;
	}

	/**
	 * Patches/creates a Scene Action
	 * @internal
	 */
	public _add(data: ApiSceneAction): SceneAction {
		const sceneAction = this.cache.ensure(data.target.rid, () => {
			return new SceneAction(this.bridge);
		});
		sceneAction._patch(data);

		return sceneAction;
	}
}
