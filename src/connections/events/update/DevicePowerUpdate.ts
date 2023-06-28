import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function devicePowerUpdate(data: any, hue: Hue) {
	const devicePower = hue.devicePowers.cache.get(data.id);
	if (!devicePower) return;

	const clone = devicePower._update(data);

	return () => hue.emit(Events.DevicePowerUpdate, devicePower, clone);
}
