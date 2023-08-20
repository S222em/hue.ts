import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export default function sceneAdd(data: SSEResource, hue: Hue) {
	const scene = hue.scenes._add(data);

	return () => hue.emit(Events.SceneAdd, scene);
}
