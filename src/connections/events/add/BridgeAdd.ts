import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function bridgeAdd(data: any, hue: Hue) {
	const bridge = hue.bridges._add(data);
	if (!bridge) return;

	return () => hue.emit(Events.BridgeAdd, bridge);
}
