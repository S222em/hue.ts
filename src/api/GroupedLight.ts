import { APIResourceType } from './ResourceType';
import { APIResourceIdentifier } from './ResourceIdentifier';
import { APIArcheType } from './ArcheType';
import { MakeSSEUpdateData } from './Update';
import { MakeSSEDeleteData } from './Delete';

export interface APIGroupedLight {
	type: APIResourceType.GroupedLight;
	id: string;
	owner: APIResourceIdentifier;
	on?: { on: boolean };
	dimming?: { brightness: number };
	alert: {
		// TODO action_values
		action_values?: string[];
	};
}

export type RESTGroupedLightGetResponseData = APIGroupedLight[];

export interface RESTGroupedLightPutPayload {
	type?: APIResourceType.GroupedLight;
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
	alert?: {
		action: 'breathe';
	};
	dynamics?: {
		duration?: number;
		speed?: number;
	};
}

export type SSEGroupedLightAddData = APIGroupedLight;

export type SSEGroupedLightUpdateData = MakeSSEUpdateData<APIGroupedLight>;

export type SSEGroupedLightDeleteData = MakeSSEDeleteData<APIGroupedLight>;
