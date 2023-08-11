import { ZigbeeDeviceDiscoveryEditOptions } from '../structures/ZigbeeDeviceDiscovery';
import { RESTZigbeeDeviceDiscoveryPutPayload } from '../api/ZigbeeDeviceDiscovery';

export function createZigbeeDeviceDiscoveryPutPayload(
	options: ZigbeeDeviceDiscoveryEditOptions,
): RESTZigbeeDeviceDiscoveryPutPayload {
	return { action: { action_type: options.actionType } };
}
