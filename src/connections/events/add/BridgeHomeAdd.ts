import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function bridgeHomeAdd(data: any, hue: Hue) {
	const bridgeHome = hue.bridgeHomes._add(data);
	if (!bridgeHome) return;

	return () => hue.emit(Events.BridgeHomeAdd, bridgeHome);
}
