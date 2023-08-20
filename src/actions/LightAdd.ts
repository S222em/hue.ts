import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export default function lightAdd(data: SSEResource, hue: Hue) {
	const light = hue.lights._add(data);

	return () => hue.emit(Events.LightAdd, light);
}
