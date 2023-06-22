import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function lightUpdate(data: any, bridge: Bridge) {
	const light = bridge.lights._cache.get(data.id);
	if (!light) return;

	const clone = light._update(data);

	bridge.emit(Events.LightUpdate, light, clone);
}
