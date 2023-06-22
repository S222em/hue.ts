import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function lightDelete(data: any, bridge: Bridge) {
	const light = bridge.lights._cache.get(data.id);
	if (!light) return;

	const clone = light._clone();

	bridge.devices._cache.delete(data.id);

	bridge.emit(Events.LightDelete, clone);
}
