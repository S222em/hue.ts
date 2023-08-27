import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export function sceneAdd(data: SSEResource, hue: Hue) {
	const scene = hue.scenes._add(data);

	return () => hue.emit(Events.SceneAdd, scene);
}

export function sceneUpdate(data: SSEResource, hue: Hue) {
	const scene = hue.scenes.cache.get(data.id);
	if (!scene) return;

	const clone = scene._update(data);

	return () => hue.emit(Events.SceneUpdate, scene, clone);
}

export function sceneDelete(data: SSEResource, hue: Hue) {
	const scene = hue.scenes.cache.get(data.id);
	if (!scene) return;

	const clone = scene._clone();

	hue.scenes.cache.delete(data.id);

	return () => hue.emit(Events.SceneDelete, clone);
}
