import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSESceneAddData } from '../../api/Scene';

export default function sceneAdd(data: SSESceneAddData, hue: Hue) {
	const scene = hue.scenes._add(data);
	if (!scene) return;

	return () => hue.emit(Events.SceneAdd, scene);
}
