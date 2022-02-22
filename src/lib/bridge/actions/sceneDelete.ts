import type { Bridge } from '../Bridge';
import type { ApiScene } from '../../../api';
import { Events } from '../../util/Events';

export default function sceneDelete(bridge: Bridge, data: ApiScene.Object) {
	const existing = bridge.scenes.cache.get(data.id);
	if (existing) {
		const scene = existing._clone();
		if (bridge.scenes.cache.delete(data.id)) {
			bridge.emit(Events.SceneDelete, scene);
		}
	}
}
