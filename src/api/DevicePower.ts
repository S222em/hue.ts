import { APIResourceType } from './ResourceType';
import { APIResourceIdentifier } from './ResourceIdentifier';
import { MakeSSEUpdateData } from './Update';
import { MakeSSEDeleteData } from './Delete';

export interface APIDevicePower {
	type: APIResourceType.DevicePower;
	id: string;
	owner: APIResourceIdentifier;
	power_state: {
		battery_state: 'normal' | 'low' | 'critical';
		battery_level: number;
	};
}

export type RESTDevicePowerGetResponseData = APIDevicePower[];

export type SSEDevicePowerAddData = APIDevicePower;

export type SSEDevicePowerUpdateData = MakeSSEUpdateData<APIDevicePower>;

export type SSEDevicePowerDeleteData = MakeSSEDeleteData<APIDevicePower>;
