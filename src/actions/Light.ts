import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export function lightAdd(data: SSEResource, hue: Hue) {
	const light = hue.lights._add(data);

	return () => hue.emit(Events.LightAdd, light);
}

export function lightUpdate(data: SSEResource, hue: Hue) {
	const light = hue.lights.cache.get(data.id);
	if (!light) return;

	const clone = light._update(data);

	return () => hue.emit(Events.LightUpdate, light, clone);
}

export function lightDelete(data: SSEResource, hue: Hue) {
	const light = hue.lights.cache.get(data.id);
	if (!light) return;

	const clone = light._clone();

	hue.lights.cache.delete(data.id);

	return () => hue.emit(Events.LightDelete, clone);
}
