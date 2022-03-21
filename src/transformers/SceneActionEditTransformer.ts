import { Light, LightResolvable } from '../structures/Light';
import { ApiSceneAction } from '../types/api/scene_action';
import { ApiResourceType } from '../types/api/common';
import { lightStateTransformer } from './LightStateTransformer';

export interface SceneActionEditOptions {
	light: LightResolvable;
	on?: boolean;
	brightness?: number;
	temperature?: number;
	color?: string;
	gradient?: string[];
}

export function sceneActionEditTransformer(options: SceneActionEditOptions, light: Light): ApiSceneAction {
	return {
		target: {
			rid: light.id,
			rtype: ApiResourceType.Light,
		},
		action: lightStateTransformer(options, light),
	};
}
