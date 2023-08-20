import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export default function groupedLightAdd(data: SSEResource, hue: Hue) {
	const groupedLight = hue.groupedLights._add(data);

	return () => hue.emit(Events.GroupedLightAdd, groupedLight);
}
