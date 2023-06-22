import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function zoneUpdate(data: any, bridge: Bridge) {
	const zone = bridge.zones._cache.get(data.id);
	if (!zone) return;

	const clone = zone._update(data);

	bridge.emit(Events.ZoneUpdate, zone, clone);
}
