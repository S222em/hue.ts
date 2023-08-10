import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEBridgeHomeAddData } from '../../api/BridgeHome';

export default function bridgeHomeAdd(data: SSEBridgeHomeAddData, hue: Hue) {
	const bridgeHome = hue.bridgeHomes._add(data);
	if (!bridgeHome) return;

	return () => hue.emit(Events.BridgeHomeAdd, bridgeHome);
}
