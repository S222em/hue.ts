import { z } from 'zod';
import { sceneActionTransformer, sceneActionValidator } from './SceneActionTransformer';
import { Scene } from '../structures/Scene';
import { ApiScene } from '../types/api/scene';

export const sceneValidator = z.object({
	name: z.string().optional().nullable(),
	actions: sceneActionValidator.array().optional().nullable(),
});

export type SceneOptions = z.infer<typeof sceneValidator>;

export function sceneTransformer(scene: Scene, options: SceneOptions): ApiScene {
	return sceneValidator
		.transform((data): ApiScene => {
			return {
				metadata: data.name ? { name: data.name } : undefined,
				actions: data.actions
					? data.actions?.map((action) => sceneActionTransformer(scene.bridge.lights.resolve(action.light), action))
					: undefined,
			};
		})
		.parse(options);
}
