import { Manager } from './Manager';
import { SceneAction } from '../structures/SceneAction';
import Collection from '@discordjs/collection';
import type { ApiSceneAction } from '../types/api';
import type { Scene } from '../structures/Scene';

export class SceneActionManager extends Manager<string> {
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
