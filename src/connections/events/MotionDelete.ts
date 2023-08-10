import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEMotionDeleteData } from '../../api/Motion';

export default function motionDelete(data: SSEMotionDeleteData, hue: Hue) {
	const motion = hue.motions.cache.get(data.id);
	if (!motion) return;

	const clone = motion._clone();

	hue.devices.cache.delete(data.id);

	return () => hue.emit(Events.MotionDelete, clone);
}
