import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export function lightLevelAdd(data: SSEResource, hue: Hue) {
	const lightLevel = hue.lightLevels._add(data);

	return () => hue.emit(Events.LightLevelAdd, lightLevel);
}

export function lightLevelUpdate(data: SSEResource, hue: Hue) {
	const lightLevels = hue.lightLevels.cache.get(data.id);
	if (!lightLevels) return;

	const clone = lightLevels._update(data);

	return () => hue.emit(Events.LightLevelUpdate, lightLevels, clone);
}

export function lightLevelDelete(data: SSEResource, hue: Hue) {
	const lightLevel = hue.lightLevels.cache.get(data.id);
	if (!lightLevel) return;

	const clone = lightLevel._clone();

	hue.lightLevels.cache.delete(data.id);

	return () => hue.emit(Events.LightLevelDelete, clone);
}
