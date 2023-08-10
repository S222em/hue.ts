import { APIResourceType } from './ResourceType';
import { APIResourceIdentifier } from './ResourceIdentifier';
import { MakeSSEUpdateData } from './Update';
import { MakeSSEDeleteData } from './Delete';

export interface APIScene {
	type: APIResourceType.Scene;
	id: string;
	metadata: {
		name: string;
		image?: APIResourceIdentifier;
	};
	group: APIResourceIdentifier;
	actions: Array<{
		target: APIResourceIdentifier;
		action: {
			on?: { on: boolean };
			dimming?: { brightness: number };
			color?: { xy: { x: number; y: number } };
			color_temperature?: { mirek: number };
			gradient?: {
				points: Array<{
					color: { xy: { x: number; y: number } };
				}>;
			};
			effects?: 'fire' | 'candle' | 'no_effect';
			dynamics?: {
				duration: number;
			};
		};
	}>;
	palette?: {
		color: Array<{
			color: { xy: { x: number; y: number } };
			dimming: { brightness: number };
		}>;
		dimming: { brightness: number };
		color_temperature: { color_temperature: { mirek: number }; dimming: { brightness: number } };
	};
	speed: number;
}

export type RESTSceneGetResponseData = APIScene[];

export interface RESTScenePutPayload {
	type?: APIResourceType.Scene;
	metadata?: { name: string };
	actions?: Array<{
		target: APIResourceIdentifier;
		action: {
			on?: { on?: boolean };
			dimming?: { brightness?: number };
			color?: { xy: { x: number; y: number } };
			color_temperature?: { mirek?: number };
			gradient?: {
				points: Array<{
					color: { xy: { x: number; y: number } };
				}>;
			};
			effects?: 'fire' | 'candle' | 'no_effect';
			dynamics?: {
				duration: number;
			};
		};
	}>;
	recall?: {
		action?: 'active' | 'dynamic_palette';
		status?: 'active' | 'dynamic_palette';
		duration?: number;
		dimming?: {
			brightness?: number;
		};
	};
	palette?: {
		color: Array<{
			color: { xy: { x: number; y: number } };
			dimming: { brightness: number };
		}>;
		dimming: { brightness: number };
		color_temperature: { color_temperature: { mirek: number }; dimming: { brightness: number } };
	};
	speed?: number;
}

export interface RESTScenePostPayload {
	type?: APIResourceType.Scene;
	metadata?: { name: string; image?: APIResourceIdentifier };
	group: APIResourceIdentifier;
	actions: Array<{
		target: APIResourceIdentifier;
		action: {
			on?: { on: boolean };
			dimming?: { brightness: number };
			color?: { xy: { x: number; y: number } };
			color_temperature?: { mirek: number };
			gradient?: {
				points: Array<{
					color: { xy: { x: number; y: number } };
				}>;
			};
			effects?: 'fire' | 'candle' | 'no_effect';
			dynamics?: {
				duration: number;
			};
		};
	}>;
	palette?: {
		color: Array<{
			color: { xy: { x: number; y: number } };
			dimming: { brightness: number };
		}>;
		dimming: { brightness: number };
		color_temperature: { color_temperature: { mirek: number }; dimming: { brightness: number } };
	};
	speed?: number;
}

export type SSESceneAddData = APIScene;

export type SSESceneUpdateData = MakeSSEUpdateData<APIScene>;

export type SSESceneDeleteData = MakeSSEDeleteData<APIScene>;
