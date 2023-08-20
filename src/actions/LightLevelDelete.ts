import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export default function lightLevelDelete(data: SSEResource, hue: Hue) {
	const lightLevel = hue.lightLevels.cache.get(data.id);
	if (!lightLevel) return;

	const clone = lightLevel._clone();

	hue.lightLevels.cache.delete(data.id);

	return () => hue.emit(Events.LightLevelDelete, clone);
}
