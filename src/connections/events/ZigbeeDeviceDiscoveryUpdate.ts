import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEZigbeeDeviceDiscoveryUpdateData } from '../../api/ZigbeeDeviceDiscovery';

export default function zigbeeDeviceDiscoveryUpdate(data: SSEZigbeeDeviceDiscoveryUpdateData, hue: Hue) {
	const zigbeeDeviceDiscovery = hue.zigbeeDeviceDiscoveries.cache.get(data.id);
	if (!zigbeeDeviceDiscovery) return;

	const clone = zigbeeDeviceDiscovery._update(data);

	return () => hue.emit(Events.ZigbeeDeviceDiscoveryUpdate, zigbeeDeviceDiscovery, clone);
}
