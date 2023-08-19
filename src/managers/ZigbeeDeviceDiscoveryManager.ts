import { ResourceManager } from './ResourceManager';
import { APIResourceType } from '../types/api';
import { ZigbeeDeviceDiscovery, ZigbeeDeviceDiscoveryEditOptions } from '../structures/ZigbeeDeviceDiscovery';
import { createZigbeeDeviceDiscoveryPutPayload } from '../payloads/zigbeeDeviceDiscoveryPayload';

/**
 * Manages the zigbee_device_discovery resource
 */
export class ZigbeeDeviceDiscoveryManager extends ResourceManager<ZigbeeDeviceDiscovery> {
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
	public async edit(id: string, options: ZigbeeDeviceDiscoveryEditOptions): Promise<string> {
		return await this._put(id, createZigbeeDeviceDiscoveryPutPayload(options));
	}
}
