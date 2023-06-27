import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function sceneAdd(data: any, hue: Hue) {
	const scene = hue.scenes._add(data);
	if (!scene) return;

	return () => hue.emit(Events.SceneAdd, scene);
}
