import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export default function lightLevelAdd(data: SSEResource, hue: Hue) {
	const lightLevel = hue.lightLevels._add(data);

	return () => hue.emit(Events.LightLevelAdd, lightLevel);
}
