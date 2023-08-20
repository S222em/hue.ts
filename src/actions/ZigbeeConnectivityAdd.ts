import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export default function zigbeeConnectivityAdd(data: SSEResource, hue: Hue) {
	const zigbeeConnectivity = hue.zigbeeConnectivities._add(data);
	if (!zigbeeConnectivity) return;

	return () => hue.emit(Events.ZigbeeConnectivityAdd, zigbeeConnectivity);
}
