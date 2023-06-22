import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function zoneDelete(data: any, bridge: Bridge) {
	const zone = bridge.zones._cache.get(data.id);
	if (!zone) return;

	const clone = zone._clone();

	bridge.zones._cache.delete(data.id);

	bridge.emit(Events.ZoneDelete, clone);
}
