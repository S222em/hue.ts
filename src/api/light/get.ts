import { ApiResourceType } from '../ApiResourceType';
import { ResourceIdentifier } from '../ResourceIdentifier';

export interface ApiLightGet {
	type?: ApiResourceType.Light;
	id: string;
	owner: ResourceIdentifier;
	metadata: {
		archetype: string;
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
		status_value: any[];
		status: 'fire' | 'candle' | 'no_effect';
		effect_values: any[];
	};
	timed_effects?: {
		effect: 'sunrise' | 'no_effect';
		duration: number;
		status_values: any[];
		status: 'sunrise' | 'no_effect';
		effect_values: any[];
	};
}
