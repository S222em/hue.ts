import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export function zigbeeDeviceDiscoveryAdd(data: SSEResource, hue: Hue) {
	const zigbeeDeviceDiscovery = hue.zigbeeDeviceDiscoveries._add(data);

	return () => hue.emit(Events.ZigbeeDeviceDiscoveryAdd, zigbeeDeviceDiscovery);
}

export function zigbeeDeviceDiscoveryUpdate(data: SSEResource, hue: Hue) {
	const zigbeeDeviceDiscovery = hue.zigbeeDeviceDiscoveries.cache.get(data.id);
	if (!zigbeeDeviceDiscovery) return;

	const clone = zigbeeDeviceDiscovery._update(data);

	return () => hue.emit(Events.ZigbeeDeviceDiscoveryUpdate, zigbeeDeviceDiscovery, clone);
}

export function zigbeeDeviceDiscoveryDelete(data: SSEResource, hue: Hue) {
	const zigbeeDeviceDiscovery = hue.zigbeeDeviceDiscoveries.cache.get(data.id);
	if (!zigbeeDeviceDiscovery) return;

	const clone = zigbeeDeviceDiscovery._clone();

	hue.zigbeeDeviceDiscoveries.cache.delete(data.id);

	return () => hue.emit(Events.ZigbeeDeviceDiscoveryDelete, clone);
}
