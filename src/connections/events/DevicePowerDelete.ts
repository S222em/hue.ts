import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEDevicePowerDeleteData } from '../../api/DevicePower';

export default function devicePowerDelete(data: SSEDevicePowerDeleteData, hue: Hue) {
	const devicePower = hue.devicePowers.cache.get(data.id);
	if (!devicePower) return;

	const clone = devicePower._clone();

	hue.devicePowers.cache.delete(data.id);

	return () => hue.emit(Events.DevicePowerDelete, clone);
}
