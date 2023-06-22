import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function groupedLightUpdate(data: any, bridge: Bridge) {
	const groupedLight = bridge.groupedLights._cache.get(data.id);
	if (!groupedLight) return;

	const clone = groupedLight._update(data);

	bridge.emit(Events.GroupedLightUpdate, groupedLight, clone);
}
