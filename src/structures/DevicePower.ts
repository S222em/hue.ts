import { Resource } from './Resource';
import { APIResource, APIResourceIdentifier, APIResourceType } from '../types/api';
import { DevicePowerManager } from '../managers/DevicePowerManager';

export interface APIDevicePower extends APIResource<APIResourceType.DevicePower> {
	owner: APIResourceIdentifier;
	power_state: {
		battery_state: 'normal' | 'low' | 'critical';
		battery_level: number;
	};
}

export enum DevicePowerBatteryState {
	Normal = 'normal',
	Low = 'low',
	Critical = 'critical',
}

/**
 * Represents the device_power resource from the hue API
 */
export class DevicePower extends Resource<APIDevicePower> {
	type = APIResourceType.DevicePower;

	get manager(): DevicePowerManager {
		return this.hue.devicePowers;
	}

	/**
	 * ID of this device power's owner
	 */
	get ownerId(): string {
		return this.data.owner.rid;
	}

	/**
	 * This device power's battery state
	 */
	get batteryState(): DevicePowerBatteryState {
		return this.data.power_state.battery_state as DevicePowerBatteryState;
	}

	/**
	 * This device power's battery level in percentages
	 */
	get batteryLevel(): number {
		return this.data.power_state.battery_level;
	}
}
