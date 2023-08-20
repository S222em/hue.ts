import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export default function bridgeUpdate(data: SSEResource, hue: Hue) {
	const bridge = hue.bridges.cache.get(data.id);
	if (!bridge) return;

	const clone = bridge._update(data);

	return () => hue.emit(Events.BridgeUpdate, bridge, clone);
}
