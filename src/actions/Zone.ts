import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export function zoneAdd(data: SSEResource, hue: Hue) {
	const zone = hue.zones._add(data);

	return () => hue.emit(Events.ZoneAdd, zone);
}

export function zoneUpdate(data: SSEResource, hue: Hue) {
	const zone = hue.zones.cache.get(data.id);
	if (!zone) return;

	const clone = zone._update(data);

	return () => hue.emit(Events.ZoneUpdate, zone, clone);
}

export function zoneDelete(data: SSEResource, hue: Hue) {
	const zone = hue.zones.cache.get(data.id);
	if (!zone) return;

	const clone = zone._clone();

	hue.zones.cache.delete(data.id);

	return () => hue.emit(Events.ZoneDelete, clone);
}
