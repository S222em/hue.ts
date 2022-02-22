import { BaseManager } from './BaseManager';
import { SceneAction, SceneActionData } from '../structures/SceneAction';
import type { Scene } from '../structures/Scene';

export class SceneActionManager extends BaseManager<SceneAction> {
	private scene: Scene;

	constructor(scene: Scene) {
		super(scene.bridge);
		this.scene = scene;
	}

	public _add(data: SceneActionData): SceneAction {
		const sceneAction = this.cache.ensure(data.target.rid, () => {
			return new SceneAction(this.bridge);
		});
		sceneAction._patch(data);

		return sceneAction;
	}
}
