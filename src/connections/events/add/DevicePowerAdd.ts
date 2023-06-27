import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function devicePowerAdd(data: any, hue: Hue) {
	const devicePower = hue.devicePowers._add(data);
	if (!devicePower) return;

	return () => hue.emit(Events.DevicePowerAdd, devicePower);
}
