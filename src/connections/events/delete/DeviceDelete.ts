import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function deviceDelete(data: any, bridge: Bridge) {
	const device = bridge.devices.cache.get(data.id);
	if (!device) return;

	const clone = device._clone();

	bridge.devices.cache.delete(data.id);

	return () => bridge.emit(Events.DeviceDelete, clone);
}
