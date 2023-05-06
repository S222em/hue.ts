import type { Bridge } from '../Bridge';
import { Events } from '../../util/Events';
import { ApiScene } from '../../types/api/scene';

export default function sceneAdd(bridge: Bridge, data: ApiScene) {
	const existing = bridge.scenes.cache.get(data.id);
	const scene = bridge.scenes._add(data);
	if (!existing && scene) {
		bridge.emit(Events.SceneAdd, scene);
	}
}
