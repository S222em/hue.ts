import type { Bridge } from '../bridge/Bridge';
import { ResourceManager } from './ResourceManager';
import { Scene, SceneResolvable } from '../structures/Scene';
import type { ApiScene } from '../types/api';
import { Routes } from '../util/Routes';
import Collection from '@discordjs/collection';

export class SceneManager extends ResourceManager<SceneResolvable> {
	public readonly cache: Collection<string, Scene>;

	public constructor(bridge: Bridge) {
		super(bridge, { maxRequests: 1, perMilliseconds: 1000 });
		this.cache = new Collection();
	}

	/**
	 * Patches/creates a Scene
	 * @internal
	 */
	public _add(data: ApiScene): Scene {
		const scene = this.cache.ensure(data.id, () => new Scene(this.bridge));
		scene._patch(data);
		return scene;
	}

	/**
	 * Syncs all the Scenes of the bridge with this manager
	 */
	public async sync(): Promise<boolean | void> {
		const response = await this.rest.get(Routes.scene());
		const data = response.data.data as ApiScene[];
		data.forEach((data) => {
			this._add(data);
		});
	}
}
