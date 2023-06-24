import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function groupedLightUpdate(data: any, bridge: Bridge) {
	const groupedLight = bridge.groupedLights.cache.get(data.id);
	if (!groupedLight) return;

	const clone = groupedLight._update(data);

	return () => bridge.emit(Events.GroupedLightUpdate, groupedLight, clone);
}
