import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export default function devicePowerAdd(data: SSEResource, hue: Hue) {
	const devicePower = hue.devicePowers._add(data);

	return () => hue.emit(Events.DevicePowerAdd, devicePower);
}
