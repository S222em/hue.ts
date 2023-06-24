import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function zoneAdd(data: any, bridge: Bridge) {
	const zone = bridge.zones._add(data);
	if (!zone) return;

	return () => bridge.emit(Events.ZoneAdd, zone);
}
