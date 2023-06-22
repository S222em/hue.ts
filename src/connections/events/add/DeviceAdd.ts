import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function deviceAdd(data: any, bridge: Bridge) {
	const device = bridge.devices._create(data);
	if (!device) return;

	bridge.emit(Events.DeviceAdd, device);
}
