import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function sceneDelete(data: any, bridge: Bridge) {
	const scene = bridge.scenes.cache.get(data.id);
	if (!scene) return;

	const clone = scene._clone();

	bridge.scenes.cache.delete(data.id);

	return () => bridge.emit(Events.SceneDelete, clone);
}
