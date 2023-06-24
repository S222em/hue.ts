import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function lightAdd(data: any, bridge: Bridge) {
	const light = bridge.lights._add(data);
	if (!light) return;

	return () => bridge.emit(Events.LightAdd, light);
}
