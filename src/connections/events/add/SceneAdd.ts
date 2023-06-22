import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function sceneAdd(data: any, bridge: Bridge) {
	const scene = bridge.scenes._create(data);
	if (!scene) return;

	bridge.emit(Events.SceneAdd, scene);
}
