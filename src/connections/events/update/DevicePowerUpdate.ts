import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function devicePowerUpdate(data: any, bridge: Bridge) {
	const devicePower = bridge.devicePowers._cache.get(data.id);
	if (!devicePower) return;

	const clone = devicePower._update(data);

	bridge.emit(Events.DevicePowerUpdate, devicePower, clone);
}
