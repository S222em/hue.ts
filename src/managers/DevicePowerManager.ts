import { ResourceManager } from './ResourceManager';
import { APIResourceType } from '../types/api';
import { DevicePower } from '../structures/DevicePower';

/**
 * Manages the device_power resource
 */
export class DevicePowerManager extends ResourceManager<DevicePower> {
	type = APIResourceType.DevicePower;
	holds = DevicePower;
}
