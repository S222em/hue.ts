import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function devicePowerDelete(data: any, bridge: Bridge) {
	const devicePower = bridge.devicePowers._cache.get(data.id);
	if (!devicePower) return;

	const clone = devicePower._clone();

	bridge.devicePowers._cache.delete(data.id);

	bridge.emit(Events.DevicePowerDelete, clone);
}
