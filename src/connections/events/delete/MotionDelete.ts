import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function motionDelete(data: any, bridge: Bridge) {
	const motion = bridge.motions._cache.get(data.id);
	if (!motion) return;

	const clone = motion._clone();

	bridge.devices._cache.delete(data.id);

	bridge.emit(Events.MotionDelete, clone);
}
