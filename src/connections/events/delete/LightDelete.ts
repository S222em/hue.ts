import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function lightDelete(data: any, bridge: Bridge) {
	const light = bridge.lights.cache.get(data.id);
	if (!light) return;

	const clone = light._clone();

	bridge.devices.cache.delete(data.id);

	return () => bridge.emit(Events.LightDelete, clone);
}
