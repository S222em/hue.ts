import { APIResourceType } from './ResourceType';
import { APIResourceIdentifier } from './ResourceIdentifier';
import { APIArcheType } from './ArcheType';
import { MakeSSEUpdateData } from './Update';
import { MakeSSEDeleteData } from './Delete';

export interface APIRoom {
	type: APIResourceType.Room;
	id: string;
	children: Array<APIResourceIdentifier>;
	services: Array<APIResourceIdentifier>;
	metadata: {
		name: string;
		archetype: APIArcheType;
	};
}

export type RESTRoomGetResponseData = APIRoom[];

export interface RESTRoomPutPayload {
	type?: APIResourceType.Room;
	children?: Array<APIResourceIdentifier>;
	metadata?: {
		name?: string;
		archetype?: APIArcheType;
	};
}

export interface RESTRoomPostPayload {
	type?: APIResourceType.Room;
	children: Array<APIResourceIdentifier>;
	metadata: {
		name: string;
		archetype: APIArcheType;
	};
}

export type SSERoomAddData = APIRoom;

export type SSERoomUpdateData = MakeSSEUpdateData<APIRoom>;

export type SSERoomDeleteData = MakeSSEDeleteData<APIRoom>;
