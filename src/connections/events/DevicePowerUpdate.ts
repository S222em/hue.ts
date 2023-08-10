import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEDevicePowerUpdateData } from '../../api/DevicePower';

export default function devicePowerUpdate(data: SSEDevicePowerUpdateData, hue: Hue) {
	const devicePower = hue.devicePowers.cache.get(data.id);
	if (!devicePower) return;

	const clone = devicePower._update(data);

	return () => hue.emit(Events.DevicePowerUpdate, devicePower, clone);
}
