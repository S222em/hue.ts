import { Resource } from './Resource';
import { ResourceType } from '../api/ResourceType';
import { DevicePowerManager } from '../managers/DevicePowerManager';

export class DevicePower extends Resource<ResourceType.DevicePower> {
	type = ResourceType.DevicePower;

	get manager(): DevicePowerManager {
		return this.bridge.devicePowers;
	}
	get ownerId(): string {
		return this.data.owner.rid;
	}

	get batteryState(): 'normal' | 'low' | 'critical' {
		return this.data.power_state.battery_state;
	}

	get batteryLevel(): number {
		return this.data.power_state.battery_level;
	}
}
