import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { DevicePower } from '../structures/DevicePower';

/**
 * Manages the device_power resource
 */
export class DevicePowerManager extends Manager<ResourceType.DevicePower> {
	type = ResourceType.DevicePower;
	holds = DevicePower;
}
