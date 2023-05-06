import { ApiResourceType } from '../ApiResourceType';

export interface ApiLightPut {
	type?: ApiResourceType.Light;
	metadata?: {
		archetype?: string;
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
		action: 'ip' | 'down' | 'stop';
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
