import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function zigbeeDeviceDiscoveryAdd(data: any, hue: Hue) {
	const zigbeeDeviceDiscovery = hue.zigbeeDeviceDiscoveries._add(data);
	if (!zigbeeDeviceDiscovery) return;

	return () => hue.emit(Events.ZigbeeDeviceDiscoveryAdd, zigbeeDeviceDiscovery);
}
