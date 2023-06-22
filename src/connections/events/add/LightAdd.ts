import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function lightAdd(data: any, bridge: Bridge) {
	const light = bridge.lights._create(data);
	if (!light) return;

	bridge.emit(Events.LightAdd, light);
}
