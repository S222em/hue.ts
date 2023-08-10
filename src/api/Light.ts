import { APIResourceType } from './ResourceType';
import { APIResourceIdentifier } from './ResourceIdentifier';
import { APIArcheType } from './ArcheType';
import { MakeSSEUpdateData } from './Update';
import { MakeSSEDeleteData } from './Delete';

export interface APILight {
	type: APIResourceType.Light;
	id: string;
	owner: APIResourceIdentifier;
	metadata: {
		archetype: APIArcheType;
		name: string;
	};
	on: {
		on: boolean;
	};
	dimming?: {
		brightness: number;
		min_dim_level?: number;
	};
	color_temperature?: {
		mirek: number;
		mirek_valid: boolean;
		mirek_schema: {
			mirek_minimum: number;
			mirek_maximum: number;
		};
	};
	color?: {
		xy: {
			x: number;
			y: number;
		};
		gamut?: {
			red: {
				x: number;
				y: number;
			};
			green: {
				x: number;
				y: number;
			};
			blue: {
				x: number;
				y: number;
			};
		};
		gamut_type: 'A' | 'B' | 'C';
	};
	dynamics?: {
		status: 'dynamic_palette' | 'none';
		status_values: any[];
		speed: number;
		speed_valid: boolean;
	};
	mode: 'normal' | 'streaming';
	gradient?: {
		points: Array<{
			color: {
				xy: {
					x: number;
					y: number;
				};
			};
		}>;
		points_capable: number;
	};
	effects?: {
		effect: 'fire' | 'candle' | 'no_effect';
		// TODO any[] not correct type
		status_value: any[];
		status: 'fire' | 'candle' | 'no_effect';
		// TODO any[] not correct type
		effect_values: any[];
	};
	timed_effects?: {
		effect: 'sunrise' | 'no_effect';
		duration: number;
		// TODO any[] not correct type
		status_values: any[];
		status: 'sunrise' | 'no_effect';
		// TODO any[] not correct type
		effect_values: any[];
	};
}

export type RESTLightGetResponseData = APILight[];

export interface RESTLightPutPayload {
	type?: APIResourceType.Light;
	metadata?: {
		archetype?: APIArcheType;
		name?: string;
	};
	on?: {
		on?: boolean;
	};
	dimming?: {
		brightness?: number;
	};
	dimming_delta?: {
		action: 'up' | 'down' | 'stop';
		brightness?: number;
	};
	color_temperature?: {
		mirek?: number;
	};
	color_temperature_delta?: {
		action: 'up' | 'down' | 'stop';
		mirek_delta?: number;
	};
	color?: {
		xy?: {
			x: number;
			y: number;
		};
	};
	dynamics?: {
		duration?: number;
		speed?: number;
	};
	alert?: {
		action: 'breathe';
	};
	gradient?: {
		points: Array<{
			color: {
				xy: {
					x: number;
					y: number;
				};
			};
		}>;
	};
	effects?: {
		effect?: 'fire' | 'candle' | 'no_effect';
	};
	timed_effects?: {
		effect?: 'sunrise' | 'no_effect';
		duration?: number;
	};
}

export type SSELightAddData = APILight;

export type SSELightUpdateData = MakeSSEUpdateData<APILight>;

export type SSELightDeleteData = MakeSSEDeleteData<APILight>;
