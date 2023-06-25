import { ResourceType } from '../ResourceType';
import { ResourceIdentifier } from '../ResourceIdentifier';

export interface DevicePowerGet {
	type?: ResourceType.DevicePower;
	id: string;
	owner: ResourceIdentifier;
	power_state: {
		battery_state: 'normal' | 'low' | 'critical';
		battery_level: number;
	};
}
