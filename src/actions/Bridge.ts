import { SSEResource } from '../types/sse';
import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';

export function bridgeAdd(data: SSEResource, hue: Hue) {
	const bridge = hue.bridges._add(data);

	return () => hue.emit(Events.BridgeAdd, bridge);
}

export function bridgeUpdate(data: SSEResource, hue: Hue) {
	const bridge = hue.bridges.cache.get(data.id);
	if (!bridge) return;

	const clone = bridge._update(data);

	return () => hue.emit(Events.BridgeUpdate, bridge, clone);
}

export function bridgeDelete(data: SSEResource, hue: Hue) {
	const bridge = hue.bridges.cache.get(data.id);
	if (!bridge) return;

	const clone = bridge._clone();

	hue.bridges.cache.delete(data.id);

	return () => hue.emit(Events.BridgeDelete, clone);
}
