import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function motionAdd(data: any, hue: Hue) {
	const motion = hue.motions._add(data);
	if (!motion) return;

	return () => hue.emit(Events.MotionAdd, motion);
}
