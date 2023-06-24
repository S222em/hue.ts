import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { Device } from '../structures/Device';

export class DeviceManager extends Manager<ResourceType.Device> {
	type = ResourceType.Device;
	_resourceClass = Device;
}
