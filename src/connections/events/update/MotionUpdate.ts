import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function motionUpdate(data: any, hue: Hue) {
	const motion = hue.motions.cache.get(data.id);
	if (!motion) return;

	const clone = motion._update(data);

	return () => hue.emit(Events.MotionUpdate, motion, clone);
}
