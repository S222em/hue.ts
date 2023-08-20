import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export default function lightUpdate(data: SSEResource, hue: Hue) {
	const light = hue.lights.cache.get(data.id);
	if (!light) return;

	const clone = light._update(data);

	return () => hue.emit(Events.LightUpdate, light, clone);
}
