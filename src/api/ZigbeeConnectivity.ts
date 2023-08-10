import { APIResourceType } from './ResourceType';
import { APIResourceIdentifier } from './ResourceIdentifier';
import { MakeSSEUpdateData } from './Update';
import { MakeSSEDeleteData } from './Delete';

export interface APIZigbeeConnectivity {
	type: APIResourceType.ZigbeeConnectivity;
	id: string;
	owner: APIResourceIdentifier;
	status: 'connected' | 'disconnected' | 'connectivity_issue' | 'unidirectional_incoming';
	mac_address: string;
}

export type RESTZigbeeConnectivityGetResponseData = APIZigbeeConnectivity[];

export type SSEZigbeeConnectivityAddData = APIZigbeeConnectivity;

export type SSEZigbeeConnectivityUpdateData = MakeSSEUpdateData<APIZigbeeConnectivity>;

export type SSEZigbeeConnectivityDeleteData = MakeSSEDeleteData<APIZigbeeConnectivity>;
