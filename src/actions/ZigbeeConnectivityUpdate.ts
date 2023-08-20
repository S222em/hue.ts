import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export default function zigbeeConnectivityUpdate(data: SSEResource, hue: Hue) {
	const zigbeeConnectivity = hue.zigbeeConnectivities.cache.get(data.id);
	if (!zigbeeConnectivity) return;

	const clone = zigbeeConnectivity._update(data);

	return () => hue.emit(Events.ZigbeeConnectivityUpdate, zigbeeConnectivity, clone);
}
