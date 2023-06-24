import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function motionAdd(data: any, bridge: Bridge) {
	const motion = bridge.motions._add(data);
	if (!motion) return;

	return () => bridge.emit(Events.MotionAdd, motion);
}
