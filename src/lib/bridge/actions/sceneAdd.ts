import type { Bridge } from '../Bridge';
import type { ApiScene } from '../../../api';
import { Events } from '../../util/Events';

export default function sceneAdd(bridge: Bridge, data: ApiScene.Object) {
	const existing = bridge.scenes.cache.get(data.id);
	const scene = bridge.scenes._add(data);
	if (!existing && scene) {
		bridge.emit(Events.SceneAdd, scene);
	}
}
