import type { Bridge } from '../Bridge';
import type { ApiScene } from '../../../api';
import { Events } from '../../util/Events';

export default function sceneUpdate(bridge: Bridge, data: ApiScene.Data) {
	const scene = bridge.scenes.cache.get(data.id);
	if (scene) {
		const old = scene._update(data);
		bridge.emit(Events.SceneUpdate, old, scene);
	}
}
