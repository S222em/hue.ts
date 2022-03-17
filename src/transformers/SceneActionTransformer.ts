import { z } from 'zod';
import { Light } from '../structures/Light';
import { DeepPartial } from '../types/common';
import { ApiSceneAction } from '../types/api';
import { lightStateTransformer } from './LightStateTransformer';

export const sceneActionValidator = z.object({
	light: z.string().or(z.instanceof(Light)).nullable(),
	on: z.boolean().optional().nullable(),
	brightness: z.number().optional().nullable(),
	temperature: z.number().optional().nullable(),
	color: z.string().optional().nullable(),
	gradient: z.string().array().optional().nullable(),
});

export type SceneActionOptions = z.infer<typeof sceneActionValidator>;

export function sceneActionTransformer(light: Light, options: SceneActionOptions): DeepPartial<ApiSceneAction> {
	return sceneActionValidator
		.transform((data): DeepPartial<ApiSceneAction> => {
			return {
				target: {
					rid: light.id,
					rtype: 'light',
				},
				action: lightStateTransformer(light, data),
			};
		})
		.parse(options);
}
