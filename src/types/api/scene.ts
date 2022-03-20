import {
	ApiColor,
	ApiColorTemperature,
	ApiConnectedResource,
	ApiDimming,
	ApiMetadata,
	ApiResourceType,
	ApiReturnDelete,
	ApiReturnGet,
	ApiReturnPost,
	ApiReturnPut,
} from './common';
import { ApiSceneAction } from './scene_action';

export interface ApiScene {
	type?: ApiResourceType.Scene;
	id?: string;
	metadata?: ApiMetadata & {
		image?: ApiConnectedResource;
	};
	group?: ApiConnectedResource;
	actions?: Array<ApiSceneAction>;
	palette?: {
		color?: {
			color?: ApiColor;
			dimming?: ApiDimming;
		};
		dimming?: ApiDimming;
		color_temperature?: ApiColorTemperature & {
			dimming?: ApiDimming;
		};
	};
	speed?: number;
	recall?: {
		action?: 'active' | 'dynamic_palette';
		status?: 'active' | null;
		duration?: number;
		dimming?: ApiDimming;
	};
}

export type ApiSceneGet = ApiReturnGet<ApiScene>;
export type ApiScenePut = ApiReturnPut<ApiResourceType.Scene>;
export type ApiSceneDelete = ApiReturnDelete<ApiResourceType.Scene>;
export type ApiScenePost = ApiReturnPost<ApiResourceType.Scene>;
