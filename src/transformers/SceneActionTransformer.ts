import { z } from 'zod';
import { Light } from '../structures/Light';
import { lightStateTransformer } from './LightStateTransformer';
import { ApiSceneAction } from '../types/api/scene_action';
import { ApiResourceType } from '../types/api/common';

export const sceneActionValidator = z.object({
	light: z.string().or(z.instanceof(Light)).nullable(),
	on: z.boolean().optional().nullable(),
	brightness: z.number().optional().nullable(),
	temperature: z.number().optional().nullable(),
	color: z.string().optional().nullable(),
	gradient: z.string().array().optional().nullable(),
});

export type SceneActionOptions = z.infer<typeof sceneActionValidator>;

export function sceneActionTransformer(light: Light, options: SceneActionOptions): ApiSceneAction {
	return sceneActionValidator
		.transform((data): ApiSceneAction => {
			return {
				target: {
					rid: light.id,
					rtype: ApiResourceType.Light,
				},
				action: lightStateTransformer(light, data),
			};
		})
		.parse(options);
}
