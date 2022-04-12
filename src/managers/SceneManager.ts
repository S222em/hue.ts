import type { Bridge } from '../bridge/Bridge';
import { ResourceManager } from './ResourceManager';
import { Scene } from '../structures/Scene';
import { Routes } from '../util/Routes';
import Collection from '@discordjs/collection';
import { ApiScene, ApiSceneGet } from '../types/api/scene';

/**
 * Manager for all Hue scenes
 */
export class SceneManager extends ResourceManager<Scene> {
	/**
	 * The cache of this manager
	 */
	public readonly cache: Collection<string, Scene>;

	public constructor(bridge: Bridge) {
		super(bridge);
		this.cache = new Collection();
	}

	/**
	 * Adds or updates  a scene in the cache
	 * @param data
	 * @internal
	 */
	public _add(data: ApiScene): Scene {
		const scene = this.cache.ensure(data.id, () => new Scene(this.bridge));
		scene._patch(data);
		return scene;
	}

	/**
	 * Fetches a specific scene from the bridge
	 * @param id
	 */
	public async fetch(id?: string): Promise<boolean | void> {
		const response = await this.bridge.rest.get(Routes.scene(id));
		const data = response.data as ApiSceneGet;
		data.data.forEach((data: ApiScene) => {
			this._add(data);
		});
	}
}
