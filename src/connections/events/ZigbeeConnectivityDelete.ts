import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEResource } from '../../types/sse';

export default function zigbeeConnectivityDelete(data: SSEResource, hue: Hue) {
	const zigbeeConnectivity = hue.zigbeeConnectivities.cache.get(data.id);
	if (!zigbeeConnectivity) return;

	const clone = zigbeeConnectivity._clone();

	hue.zigbeeConnectivities.cache.delete(data.id);

	return () => hue.emit(Events.ZigbeeConnectivityDelete, clone);
}
