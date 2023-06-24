import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function groupedLightDelete(data: any, bridge: Bridge) {
	const groupedLight = bridge.groupedLights.cache.get(data.id);
	if (!groupedLight) return;

	const clone = groupedLight._clone();

	bridge.groupedLights.cache.delete(data.id);

	return () => bridge.emit(Events.GroupedLightDelete, clone);
}
