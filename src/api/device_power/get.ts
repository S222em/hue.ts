import { ApiResourceType } from '../ApiResourceType';
import { ResourceIdentifier } from '../ResourceIdentifier';

export interface ApiDevicePowerGet {
	type?: ApiResourceType.DevicePower;
	id: string;
	owner: ResourceIdentifier;
	power_state: {
		battery_state: 'normal' | 'low' | 'critical';
		battery_level: number;
	};
}
