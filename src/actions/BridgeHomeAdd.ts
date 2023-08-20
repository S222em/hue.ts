import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export default function bridgeHomeAdd(data: SSEResource, hue: Hue) {
	const bridgeHome = hue.bridgeHomes._add(data);
	if (!bridgeHome) return;

	return () => hue.emit(Events.BridgeHomeAdd, bridgeHome);
}
