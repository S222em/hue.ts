import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export function zigbeeConnectivityAdd(data: SSEResource, hue: Hue) {
	const zigbeeConnectivity = hue.zigbeeConnectivities._add(data);

	return () => hue.emit(Events.ZigbeeConnectivityAdd, zigbeeConnectivity);
}

export function zigbeeConnectivityUpdate(data: SSEResource, hue: Hue) {
	const zigbeeConnectivity = hue.zigbeeConnectivities.cache.get(data.id);
	if (!zigbeeConnectivity) return;

	const clone = zigbeeConnectivity._update(data);

	return () => hue.emit(Events.ZigbeeConnectivityUpdate, zigbeeConnectivity, clone);
}

export function zigbeeConnectivityDelete(data: SSEResource, hue: Hue) {
	const zigbeeConnectivity = hue.zigbeeConnectivities.cache.get(data.id);
	if (!zigbeeConnectivity) return;

	const clone = zigbeeConnectivity._clone();

	hue.zigbeeConnectivities.cache.delete(data.id);

	return () => hue.emit(Events.ZigbeeConnectivityDelete, clone);
}
