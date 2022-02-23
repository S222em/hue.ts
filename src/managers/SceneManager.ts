import type { Bridge } from '../bridge/Bridge';
import { ResourceManager } from './ResourceManager';
import { Scene, SceneResolvable } from '../structures/Scene';
import type { ApiScene } from '../types/api';
import { Routes } from '../util/Routes';

export class SceneManager extends ResourceManager<Scene> {
	public constructor(bridge: Bridge) {
		super(bridge, { maxRequests: 1, perMilliseconds: 1000 });
	}

	public _add(data: ApiScene): Scene {
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
		const response = await this.rest.get(Routes.scene());
		const data = response.data.data as ApiScene[];
		data.forEach((data) => {
			this._add(data);
		});
	}
}
