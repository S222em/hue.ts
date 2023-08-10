import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEZigbeeDeviceDiscoveryAddData } from '../../api/ZigbeeDeviceDiscovery';

export default function zigbeeDeviceDiscoveryAdd(data: SSEZigbeeDeviceDiscoveryAddData, hue: Hue) {
	const zigbeeDeviceDiscovery = hue.zigbeeDeviceDiscoveries._add(data);
	if (!zigbeeDeviceDiscovery) return;

	return () => hue.emit(Events.ZigbeeDeviceDiscoveryAdd, zigbeeDeviceDiscovery);
}
