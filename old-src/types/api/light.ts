import {
	ApiColor,
	ApiColorTemperature,
	ApiConnectedResource,
	ApiDimming,
	ApiGradient,
	ApiMetadata,
	ApiOn,
	ApiResourceType,
	ApiReturnGet,
	ApiReturnPut,
} from './common';

export interface ApiLight {
	type?: ApiResourceType.Light;
	id?: string;
	owner?: ApiConnectedResource;
	metadata?: ApiMetadata;
	on?: ApiOn;
	dimming?: ApiDimming & {
		min_dim_level?: number;
	};
	color_temperature?: ApiColorTemperature & {
		mirek_valid?: boolean;
		mirek_schema?: {
			mirek_minimum?: number;
			mirek_maximum?: number;
		};
	};
	color?: ApiColor & {
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
		gamut_type?: 'A' | 'B' | 'C';
	};
	dynamics?: {
		speed?: number;
		status?: 'dynamic_palette' | 'none';
		// TODO find the actual object for this
		status_values?: any[];
		speed_valid?: boolean;
	};
	alert?: {
		// TODO find the actual object for this
		action_values?: any[];
		action?: string;
	};
	mode?: 'normal' | 'streaming';
	gradient?: ApiGradient & {
		points_capable?: number;
	};
}

export type ApiLightGet = ApiReturnGet<ApiLight>;
export type ApiLightPut = ApiReturnPut<ApiResourceType.Light>;
