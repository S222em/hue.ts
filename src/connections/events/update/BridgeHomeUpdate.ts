import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function bridgeHomeUpdate(data: any, hue: Hue) {
	const bridgeHome = hue.bridgeHomes.cache.get(data.id);
	if (!bridgeHome) return;

	const clone = bridgeHome._update(data);

	return () => hue.emit(Events.BridgeHomeUpdate, bridgeHome, clone);
}
