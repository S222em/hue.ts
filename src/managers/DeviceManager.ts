import { Manager } from './Manager';
import { ApiResourceType } from '../api/ApiResourceType';
import { Device } from '../structures/Device';

export class DeviceManager extends Manager<ApiResourceType.Device> {
	type = ApiResourceType.Device;
	_resourceClass = Device;
}
