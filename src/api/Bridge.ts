import { APIResourceType } from './ResourceType';
import { APIResourceIdentifier } from './ResourceIdentifier';
import { MakeSSEUpdateData } from './Update';
import { MakeSSEDeleteData } from './Delete';

export interface APIBridge {
	type: APIResourceType.Bridge;
	id: string;
	owner: APIResourceIdentifier;
	bridge_id: string;
	time_zone: {
		time_zone: string;
	};
}

export type RESTBridgeGetResponseData = APIBridge[];

export type SSEBridgeAddData = APIBridge;

export type SSEBridgeUpdateData = MakeSSEUpdateData<APIBridge>;

export type SSEBridgeDeleteData = MakeSSEDeleteData<APIBridge>;
