import { ZigbeeDeviceDiscoveryEditOptions } from '../structures/ZigbeeDeviceDiscovery';
import { RESTPayload } from '../types/rest';

export function createZigbeeDeviceDiscoveryPutPayload(options: ZigbeeDeviceDiscoveryEditOptions): RESTPayload {
	return { action: { action_type: options.actionType } };
}
