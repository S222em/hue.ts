import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEResource } from '../../types/sse';

export default function devicePowerUpdate(data: SSEResource, hue: Hue) {
	const devicePower = hue.devicePowers.cache.get(data.id);
	if (!devicePower) return;

	const clone = devicePower._update(data);

	return () => hue.emit(Events.DevicePowerUpdate, devicePower, clone);
}
