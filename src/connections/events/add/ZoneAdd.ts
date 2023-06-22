import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function zoneAdd(data: any, bridge: Bridge) {
	const zone = bridge.zones._create(data);
	if (!zone) return;

	bridge.emit(Events.ZoneAdd, zone);
}
