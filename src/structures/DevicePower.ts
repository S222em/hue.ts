import { Resource } from './Resource';
import { ApiResourceType } from '../api/ApiResourceType';
import { ResourceIdentifier } from '../api/ResourceIdentifier';

export class DevicePower extends Resource<ApiResourceType.DevicePower> {
	type = ApiResourceType.DevicePower;

	get owner(): ResourceIdentifier {
		return this.data.owner;
	}

	get batteryState(): 'normal' | 'low' | 'critical' {
		return this.data.power_state.battery_state;
	}

	get batteryLevel(): number {
		return this.data.power_state.battery_level;
	}
}
