import { Manager } from './Manager';
import { SceneAction } from '../structures/SceneAction';
import Collection from '@discordjs/collection';
import type { Scene } from '../structures/Scene';
import { ApiSceneAction } from '../types/api/scene_action';

export class SceneActionManager extends Manager<SceneAction> {
	public readonly scene: Scene;
	public readonly cache: Collection<string, SceneAction>;

	constructor(scene: Scene) {
		super();
		this.scene = scene;
		this.cache = new Collection();
	}

	public _add(data: ApiSceneAction) {
		const sceneAction = this.cache.ensure(data.target.rid, () => new SceneAction(this.scene));
		sceneAction._patch(data);
		return sceneAction;
	}
}
