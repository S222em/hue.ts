import { APIResourceType } from './ResourceType';
import { APIResourceIdentifier } from './ResourceIdentifier';
import { APIArcheType } from './ArcheType';
import { MakeSSEUpdateData } from './Update';
import { MakeSSEDeleteData } from './Delete';

export interface APIDevice {
	type: APIResourceType.Device;
	id: string;
	product_data: {
		model_id: string;
		manufacturer_name: string;
		product_name: string;
		product_archetype: APIArcheType;
		certified: boolean;
		software_version: string;
		hardware_platform_type?: string;
	};
	metadata: {
		archetype: APIArcheType;
		name: string;
	};
	services: APIResourceIdentifier[];
}

export type RESTDeviceGetResponseData = APIDevice[];

export interface RESTDevicePutPayload {
	type?: APIResourceType.Device;
	metadata?: {
		archetype?: APIArcheType;
		name?: string;
	};
	identify?: {
		action: 'identify';
	};
}

export type SSEDeviceAddData = APIDevice;

export type SSEDeviceUpdateData = MakeSSEUpdateData<APIDevice>;

export type SSEDeviceDeleteData = MakeSSEDeleteData<APIDevice>;
