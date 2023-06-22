import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function groupedLightDelete(data: any, bridge: Bridge) {
	const groupedLight = bridge.groupedLights._cache.get(data.id);
	if (!groupedLight) return;

	const clone = groupedLight._clone();

	bridge.groupedLights._cache.delete(data.id);

	bridge.emit(Events.GroupedLightDelete, clone);
}
