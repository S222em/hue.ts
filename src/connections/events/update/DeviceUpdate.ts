import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function deviceUpdate(data: any, bridge: Bridge) {
	const device = bridge.devices._cache.get(data.id);
	if (!device) return;

	const clone = device._update(data);

	bridge.emit(Events.DeviceUpdate, device, clone);
}
