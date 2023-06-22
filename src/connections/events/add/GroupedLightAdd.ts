import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function groupedLightAdd(data: any, bridge: Bridge) {
	const groupedLight = bridge.groupedLights._create(data);
	if (!groupedLight) return;

	bridge.emit(Events.GroupedLightAdd, groupedLight);
}
