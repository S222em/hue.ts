import { APIResourceType } from './ResourceType';
import { APIResourceIdentifier } from './ResourceIdentifier';
import { MakeSSEUpdateData } from './Update';
import { MakeSSEDeleteData } from './Delete';

export interface APIBridgeHome {
	type: APIResourceType.BridgeHome;
	id: string;
	children: APIResourceIdentifier[];
	services: APIResourceIdentifier[];
}

export type RESTBridgeHomeGetResponseData = APIBridgeHome[];

export type SSEBridgeHomeAddData = APIBridgeHome;

export type SSEBridgeHomeUpdateData = MakeSSEUpdateData<APIBridgeHome>;

export type SSEBridgeHomeDeleteData = MakeSSEDeleteData<APIBridgeHome>;
