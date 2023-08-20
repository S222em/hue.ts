import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export default function devicePowerDelete(data: SSEResource, hue: Hue) {
	const devicePower = hue.devicePowers.cache.get(data.id);
	if (!devicePower) return;

	const clone = devicePower._clone();

	hue.devicePowers.cache.delete(data.id);

	return () => hue.emit(Events.DevicePowerDelete, clone);
}
