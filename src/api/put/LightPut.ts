import { ResourceType } from '../ResourceType';
import { ArcheType } from '../ArcheType';

export interface LightPut {
	type?: ResourceType.Light;
	metadata?: {
		archetype?: ArcheType;
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
