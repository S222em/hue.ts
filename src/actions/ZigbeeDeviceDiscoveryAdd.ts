import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export default function zigbeeDeviceDiscoveryAdd(data: SSEResource, hue: Hue) {
	const zigbeeDeviceDiscovery = hue.zigbeeDeviceDiscoveries._add(data);

	return () => hue.emit(Events.ZigbeeDeviceDiscoveryAdd, zigbeeDeviceDiscovery);
}
