import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export function deviceAdd(data: SSEResource, hue: Hue) {
	const device = hue.devices._add(data);

	return () => hue.emit(Events.DeviceAdd, device);
}

export function deviceUpdate(data: SSEResource, hue: Hue) {
	const device = hue.devices.cache.get(data.id);
	if (!device) return;

	const clone = device._update(data);

	return () => hue.emit(Events.DeviceUpdate, device, clone);
}

export function deviceDelete(data: SSEResource, hue: Hue) {
	const device = hue.devices.cache.get(data.id);
	if (!device) return;

	const clone = device._clone();

	hue.devices.cache.delete(data.id);

	return () => hue.emit(Events.DeviceDelete, clone);
}
