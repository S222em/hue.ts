import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEBridgeAddData } from '../../api/Bridge';

export default function bridgeAdd(data: SSEBridgeAddData, hue: Hue) {
	const bridge = hue.bridges._add(data);
	if (!bridge) return;

	return () => hue.emit(Events.BridgeAdd, bridge);
}
