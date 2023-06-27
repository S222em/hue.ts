import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function zigbeeConnectivityDelete(data: any, hue: Hue) {
	const zigbeeConnectivity = hue.zigbeeConnectivities.cache.get(data.id);
	if (!zigbeeConnectivity) return;

	const clone = zigbeeConnectivity._clone();

	hue.zigbeeConnectivities.cache.delete(data.id);

	return () => hue.emit(Events.ZigbeeConnectivityDelete, clone);
}
