import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import {
	ZigbeeDeviceDiscovery,
	ZigbeeDeviceDiscoveryActionType,
	ZigbeeDeviceDiscoveryEdit,
} from '../structures/ZigbeeDeviceDiscovery';
import { transformAction } from '../util/Transformers';

export class ZigbeeDeviceDiscoveryManager extends Manager<ResourceType.ZigbeeDeviceDiscovery> {
	type = ResourceType.ZigbeeDeviceDiscovery;
	holds = ZigbeeDeviceDiscovery;

	public async edit(id: string, options: ZigbeeDeviceDiscoveryEdit) {
		await this._put(id, {
			action: transformAction({ ...options, actionType: ZigbeeDeviceDiscoveryActionType.Search }),
		});
	}
}
