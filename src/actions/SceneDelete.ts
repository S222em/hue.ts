import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export default function sceneDelete(data: SSEResource, hue: Hue) {
	const scene = hue.scenes.cache.get(data.id);
	if (!scene) return;

	const clone = scene._clone();

	hue.scenes.cache.delete(data.id);

	return () => hue.emit(Events.SceneDelete, clone);
}
