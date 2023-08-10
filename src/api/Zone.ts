import { APIResourceType } from './ResourceType';
import { APIResourceIdentifier } from './ResourceIdentifier';
import { APIArcheType } from './ArcheType';
import { MakeSSEUpdateData } from './Update';
import { MakeSSEDeleteData } from './Delete';

export interface APIZone {
	type: APIResourceType.Zone;
	id: string;
	children: Array<APIResourceIdentifier>;
	services: Array<APIResourceIdentifier>;
	metadata: {
		name: string;
		archetype: APIArcheType;
	};
}

export type RESTZoneGetResponseData = APIZone[];

export interface RESTZonePutPayload {
	type?: APIResourceType.Zone;
	children?: Array<APIResourceIdentifier>;
	metadata?: {
		name?: string;
		archetype?: APIArcheType;
	};
}

export interface RESTZonePostPayload {
	type?: APIResourceType.Zone;
	children: Array<APIResourceIdentifier>;
	metadata: {
		name: string;
		archetype: APIArcheType;
	};
}

export type SSEZoneAddData = APIZone;

export type SSEZoneUpdateData = MakeSSEUpdateData<APIZone>;

export type SSEZoneDeleteData = MakeSSEDeleteData<APIZone>;
