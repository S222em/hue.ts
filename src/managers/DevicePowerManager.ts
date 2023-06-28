import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { DevicePower } from '../structures/DevicePower';

export class DevicePowerManager extends Manager<ResourceType.DevicePower> {
	type = ResourceType.DevicePower;
	holds = DevicePower;
}
