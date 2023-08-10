import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEMotionUpdateData } from '../../api/Motion';

export default function motionUpdate(data: SSEMotionUpdateData, hue: Hue) {
	const motion = hue.motions.cache.get(data.id);
	if (!motion) return;

	const clone = motion._update(data);

	return () => hue.emit(Events.MotionUpdate, motion, clone);
}
