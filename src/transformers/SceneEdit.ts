import { SceneActionEditOptions, sceneActionEditTransformer } from './SceneActionEdit';
import { Scene } from '../structures/Scene';
import { ApiScene } from '../types/api/scene';

export interface SceneEditOptions {
	name?: string;
	actions?: SceneActionEditOptions[];
}

export function sceneEditTransformer(options: SceneEditOptions, scene: Scene): ApiScene {
	return {
		metadata: options.name ? { name: options.name } : undefined,
		actions: options.actions
			? options.actions.map((action) => sceneActionEditTransformer(action, scene.bridge.lights.resolve(action.light)))
			: undefined,
	};
}
