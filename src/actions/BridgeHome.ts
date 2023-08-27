import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export function bridgeHomeAdd(data: SSEResource, hue: Hue) {
	const bridgeHome = hue.bridgeHomes._add(data);

	return () => hue.emit(Events.BridgeHomeAdd, bridgeHome);
}

export function bridgeHomeUpdate(data: SSEResource, hue: Hue) {
	const bridgeHome = hue.bridgeHomes.cache.get(data.id);
	if (!bridgeHome) return;

	const clone = bridgeHome._update(data);

	return () => hue.emit(Events.BridgeHomeUpdate, bridgeHome, clone);
}

export function bridgeHomeDelete(data: SSEResource, hue: Hue) {
	const bridgeHome = hue.bridgeHomes.cache.get(data.id);
	if (!bridgeHome) return;

	const clone = bridgeHome._clone();

	hue.bridgeHomes.cache.delete(data.id);

	return () => hue.emit(Events.BridgeHomeDelete, clone);
}
