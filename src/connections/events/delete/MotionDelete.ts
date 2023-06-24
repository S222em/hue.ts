import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function motionDelete(data: any, bridge: Bridge) {
	const motion = bridge.motions.cache.get(data.id);
	if (!motion) return;

	const clone = motion._clone();

	bridge.devices.cache.delete(data.id);

	return () => bridge.emit(Events.MotionDelete, clone);
}
