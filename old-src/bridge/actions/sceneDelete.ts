import type { Bridge } from '../Bridge';
import { Events } from '../../util/Events';
import { ApiScene } from '../../types/api/scene';

export default function sceneDelete(bridge: Bridge, data: ApiScene) {
	const existing = bridge.scenes.cache.get(data.id);
	if (existing) {
		const scene = existing._clone();
		if (bridge.scenes.cache.delete(data.id)) {
			bridge.emit(Events.SceneDelete, scene);
		}
	}
}
