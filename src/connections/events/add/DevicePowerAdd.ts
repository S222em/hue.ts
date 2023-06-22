import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function devicePowerAdd(data: any, bridge: Bridge) {
	const devicePower = bridge.devicePowers._create(data);
	if (!devicePower) return;

	bridge.emit(Events.DevicePowerAdd, devicePower);
}
