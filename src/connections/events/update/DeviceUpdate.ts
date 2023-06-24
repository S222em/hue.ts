import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function deviceUpdate(data: any, bridge: Bridge) {
	const device = bridge.devices.cache.get(data.id);
	if (!device) return;

	const clone = device._update(data);

	return () => bridge.emit(Events.DeviceUpdate, device, clone);
}
