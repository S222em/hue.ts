import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSESceneUpdateData } from '../../api/Scene';

export default function sceneUpdate(data: SSESceneUpdateData, hue: Hue) {
	const scene = hue.scenes.cache.get(data.id);
	if (!scene) return;

	const clone = scene._update(data);

	return () => hue.emit(Events.SceneUpdate, scene, clone);
}
