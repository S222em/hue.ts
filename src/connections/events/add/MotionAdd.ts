import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function motionAdd(data: any, bridge: Bridge) {
	const motion = bridge.motions._create(data);
	if (!motion) return;

	bridge.emit(Events.MotionAdd, motion);
}
