import { ApiResourceType } from '../ApiResourceType';
import { ResourceIdentifier } from '../ResourceIdentifier';

export interface ApiScenePut {
	type?: ApiResourceType.Scene;
	metadata?: { name: string };
	actions?: Array<{
		target: ResourceIdentifier;
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
