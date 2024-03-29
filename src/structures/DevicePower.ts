import { Resource } from './Resource';
import { ResourceType } from '../api/ResourceType';
import { DevicePowerManager } from '../managers/DevicePowerManager';

export enum DevicePowerBatteryState {
	Normal = 'normal',
	Low = 'low',
	Critical = 'critical',
}

export class DevicePower extends Resource<ResourceType.DevicePower> {
	type = ResourceType.DevicePower;

	get manager(): DevicePowerManager {
		return this.hue.devicePowers;
	}
	get ownerId(): string {
		return this.data.owner.rid;
	}

	get batteryState(): DevicePowerBatteryState {
		return this.data.power_state.battery_state as DevicePowerBatteryState;
	}

	get batteryLevel(): number {
		return this.data.power_state.battery_level;
	}
}
