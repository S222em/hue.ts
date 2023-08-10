import { Manager } from './Manager';
import { APIResourceType } from '../api/ResourceType';
import {
	ZigbeeDeviceDiscovery,
	ZigbeeDeviceDiscoveryActionType,
	ZigbeeDeviceDiscoveryEdit,
} from '../structures/ZigbeeDeviceDiscovery';
import { transformAction } from '../util/Transformers';

/**
 * Manages the zigbee_device_discovery resource
 */
export class ZigbeeDeviceDiscoveryManager extends Manager<APIResourceType.ZigbeeDeviceDiscovery> {
	type = APIResourceType.ZigbeeDeviceDiscovery;
	holds = ZigbeeDeviceDiscovery;

	/**
	 * Edits the specified zigbeeDeviceDiscovery
	 * This is only used for searching for new devices
	 * @param id
	 * @param options
	 * @example
	 * ```ts
	 * await hue.zigbeeDeviceDiscoveries.edit('some-id', {
	 *    action: ZigbeeDeviceDiscoveryActionType.Search,
	 * });
	 * ```
	 */
	public async edit(id: string, options: ZigbeeDeviceDiscoveryEdit): Promise<string> {
		return await this._put(id, {
			action: transformAction({ ...options, actionType: ZigbeeDeviceDiscoveryActionType.Search }),
		});
	}
}
