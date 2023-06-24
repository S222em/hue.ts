import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function sceneUpdate(data: any, bridge: Bridge) {
	const scene = bridge.scenes.cache.get(data.id);
	if (!scene) return;

	const clone = scene._update(data);

	return () => bridge.emit(Events.SceneUpdate, scene, clone);
}
