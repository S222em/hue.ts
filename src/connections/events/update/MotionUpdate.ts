import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function motionUpdate(data: any, bridge: Bridge) {
	const motion = bridge.motions._cache.get(data.id);
	if (!motion) return;

	const clone = motion._update(data);

	bridge.emit(Events.MotionUpdate, motion, clone);
}
