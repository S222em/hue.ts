import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function zigbeeDeviceDiscoveryDelete(data: any, hue: Hue) {
	const zigbeeDeviceDiscovery = hue.zigbeeDeviceDiscoveries.cache.get(data.id);
	if (!zigbeeDeviceDiscovery) return;

	const clone = zigbeeDeviceDiscovery._clone();

	hue.zigbeeDeviceDiscoveries.cache.delete(data.id);

	return () => hue.emit(Events.ZigbeeDeviceDiscoveryUpdate, clone);
}
