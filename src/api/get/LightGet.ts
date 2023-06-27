import { ResourceType } from '../ResourceType';
import { ResourceIdentifier } from '../ResourceIdentifier';
import { ArcheType } from '../ArcheType';

export interface LightGet {
	type?: ResourceType.Light;
	id: string;
	owner: ResourceIdentifier;
	metadata: {
		archetype: ArcheType;
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
