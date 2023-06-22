import { Manager } from './Manager';
import { ApiResourceType } from '../api/ApiResourceType';
import { DevicePower } from '../structures/DevicePower';

export class DevicePowerManager extends Manager<ApiResourceType.DevicePower> {
	type = ApiResourceType.DevicePower;
	_resourceClass = DevicePower;
}
