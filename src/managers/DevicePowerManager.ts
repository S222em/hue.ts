import { Manager } from './Manager';
import { APIResourceType } from '../api/ResourceType';
import { DevicePower } from '../structures/DevicePower';

/**
 * Manages the device_power resource
 */
export class DevicePowerManager extends Manager<APIResourceType.DevicePower> {
	type = APIResourceType.DevicePower;
	holds = DevicePower;
}
