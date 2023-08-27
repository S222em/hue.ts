import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export function zgpConnectivityAdd(data: SSEResource, hue: Hue) {
	const zgpConnectivity = hue.zgpConnectivities._add(data);

	return () => hue.emit(Events.ZgpConnectivityAdd, zgpConnectivity);
}

export function zgpConnectivityUpdate(data: SSEResource, hue: Hue) {
	const zgpConnectivity = hue.zgpConnectivities.cache.get(data.id);
	if (!zgpConnectivity) return;

	const clone = zgpConnectivity._update(data);

	return () => hue.emit(Events.ZgpConnectivityUpdate, zgpConnectivity, clone);
}

export function zgpConnectivityDelete(data: SSEResource, hue: Hue) {
	const zgpConnectivity = hue.zgpConnectivities.cache.get(data.id);
	if (!zgpConnectivity) return;

	const clone = zgpConnectivity._clone();

	hue.zgpConnectivities.cache.delete(data.id);

	return () => hue.emit(Events.ZgpConnectivityDelete, clone);
}
