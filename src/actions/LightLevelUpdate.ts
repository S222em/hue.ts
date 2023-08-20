import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export default function lightLevelUpdate(data: SSEResource, hue: Hue) {
	const lightLevels = hue.lightLevels.cache.get(data.id);
	if (!lightLevels) return;

	const clone = lightLevels._update(data);

	return () => hue.emit(Events.LightLevelUpdate, lightLevels, clone);
}
