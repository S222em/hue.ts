import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export function groupedLightAdd(data: SSEResource, hue: Hue) {
	const groupedLight = hue.groupedLights._add(data);

	return () => hue.emit(Events.GroupedLightAdd, groupedLight);
}

export function groupedLightUpdate(data: SSEResource, hue: Hue) {
	const groupedLight = hue.groupedLights.cache.get(data.id);
	if (!groupedLight) return;

	const clone = groupedLight._update(data);

	return () => hue.emit(Events.GroupedLightUpdate, groupedLight, clone);
}

export function groupedLightDelete(data: SSEResource, hue: Hue) {
	const groupedLight = hue.groupedLights.cache.get(data.id);
	if (!groupedLight) return;

	const clone = groupedLight._clone();

	hue.groupedLights.cache.delete(data.id);

	return () => hue.emit(Events.GroupedLightDelete, clone);
}
