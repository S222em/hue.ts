import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function groupedLightAdd(data: any, bridge: Bridge) {
	const groupedLight = bridge.groupedLights._add(data);
	if (!groupedLight) return;

	return () => bridge.emit(Events.GroupedLightAdd, groupedLight);
}
