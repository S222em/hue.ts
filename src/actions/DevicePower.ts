import { SSEResource } from '../types/sse';
import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';

export function devicePowerAdd(data: SSEResource, hue: Hue) {
	const devicePower = hue.devicePowers._add(data);

	return () => hue.emit(Events.DevicePowerAdd, devicePower);
}

export function devicePowerUpdate(data: SSEResource, hue: Hue) {
	const devicePower = hue.devicePowers.cache.get(data.id);
	if (!devicePower) return;

	const clone = devicePower._update(data);

	return () => hue.emit(Events.DevicePowerUpdate, devicePower, clone);
}

export function devicePowerDelete(data: SSEResource, hue: Hue) {
	const devicePower = hue.devicePowers.cache.get(data.id);
	if (!devicePower) return;

	const clone = devicePower._clone();

	hue.devicePowers.cache.delete(data.id);

	return () => hue.emit(Events.DevicePowerDelete, clone);
}
