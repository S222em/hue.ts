import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function sceneDelete(data: any, bridge: Bridge) {
	const scene = bridge.scenes._cache.get(data.id);
	if (!scene) return;

	const clone = scene._clone();

	bridge.scenes._cache.delete(data.id);

	bridge.emit(Events.SceneDelete, clone);
}
