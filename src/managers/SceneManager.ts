import type { Bridge } from '../bridge/Bridge';
import { ResourceManager } from './ResourceManager';
import { Scene } from '../structures/Scene';
import { ApiScene } from '../types/api/scene';
import { Routes } from '../util/Routes';

/**
 * Manager for all Hue scenes
 */
export class SceneManager extends ResourceManager<Scene, ApiScene> {
	public constructor(bridge: Bridge) {
		super(bridge, { createCollection: true, makeCache: () => new Scene(bridge), getRoute: Routes.scene });
	}
}
