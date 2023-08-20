import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export default function bridgeDelete(data: SSEResource, hue: Hue) {
	const bridge = hue.bridges.cache.get(data.id);
	if (!bridge) return;

	const clone = bridge._clone();

	hue.bridges.cache.delete(data.id);

	return () => hue.emit(Events.BridgeDelete, clone);
}
