import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function zoneDelete(data: any, bridge: Bridge) {
	const zone = bridge.zones.cache.get(data.id);
	if (!zone) return;

	const clone = zone._clone();

	bridge.zones.cache.delete(data.id);

	return () => bridge.emit(Events.ZoneDelete, clone);
}
