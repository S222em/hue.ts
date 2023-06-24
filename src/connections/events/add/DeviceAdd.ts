import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function deviceAdd(data: any, bridge: Bridge) {
	const device = bridge.devices._add(data);
	if (!device) return;

	return () => bridge.emit(Events.DeviceAdd, device);
}
