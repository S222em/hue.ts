import { ResourceType } from '../ResourceType';
import { ArcheType } from '../ArcheType';

export interface GroupedLightPut {
	type?: ResourceType.GroupedLight;
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
	alert?: {
		action: 'breathe';
	};
	dynamics?: {
		duration?: number;
		speed?: number;
	};
}
