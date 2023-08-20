import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export default function bridgeAdd(data: SSEResource, hue: Hue) {
	const bridge = hue.bridges._add(data);
	if (!bridge) return;

	return () => hue.emit(Events.BridgeAdd, bridge);
}
