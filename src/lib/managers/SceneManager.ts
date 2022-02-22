import type { Bridge } from '../bridge/Bridge';
import { ApiScene } from '../../api';
import { ResourceManager } from './ResourceManager';
import { Scene, SceneResolvable } from '../structures/Scene';

export class SceneManager extends ResourceManager<Scene> {
	public constructor(bridge: Bridge) {
		super(bridge, { maxRequests: 1, perMilliseconds: 1000 });
	}

	public _add(data: ApiScene.Object): Scene {
		const scene = this.cache.ensure(data.id, () => {
			return new Scene(this.bridge);
		});
		scene._patch(data);

		return scene;
	}

	public resolve(resolvable: SceneResolvable): Scene {
		if (typeof resolvable === 'string') {
			return this.cache.find((scene) => scene.name === resolvable || scene.id === resolvable);
		} else if (resolvable instanceof Scene) {
			return this.cache.find((scene) => scene.id === resolvable.id);
		}
	}

	public async sync(): Promise<boolean | void> {
		const response = await this.rest.get(ApiScene.route());
		const data = response.data.data as ApiScene.Get;
		data.forEach((data) => {
			this._add(data);
		});
	}
}
