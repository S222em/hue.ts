import { APIResourceType } from './ResourceType';
import { APIResourceIdentifier } from './ResourceIdentifier';
import { MakeSSEUpdateData } from './Update';
import { MakeSSEDeleteData } from './Delete';

export interface APIZigbeeDeviceDiscovery {
	type: APIResourceType.ZigbeeDeviceDiscovery;
	id: string;
	owner: APIResourceIdentifier;
	status: 'active' | 'ready';
}

export type RESTZigbeeDeviceDiscoveryGetResponseData = APIZigbeeDeviceDiscovery[];

export interface RESTZigbeeDeviceDiscoveryPutPayload {
	type?: APIResourceType.ZigbeeDeviceDiscovery;
	action: {
		action_type: 'search';
		// TODO not properly documented, type is unknown
		search_codes?: Array<unknown>;
		install_codes?: Array<unknown>;
	};
}

export type SSEZigbeeDeviceDiscoveryAddData = APIZigbeeDeviceDiscovery;

export type SSEZigbeeDeviceDiscoveryUpdateData = MakeSSEUpdateData<APIZigbeeDeviceDiscovery>;

export type SSEZigbeeDeviceDiscoveryDeleteData = MakeSSEDeleteData<APIZigbeeDeviceDiscovery>;
