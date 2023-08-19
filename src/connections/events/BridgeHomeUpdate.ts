import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEResource } from '../../types/sse';

export default function bridgeHomeUpdate(data: SSEResource, hue: Hue) {
	const bridgeHome = hue.bridgeHomes.cache.get(data.id);
	if (!bridgeHome) return;

	const clone = bridgeHome._update(data);

	return () => hue.emit(Events.BridgeHomeUpdate, bridgeHome, clone);
}
