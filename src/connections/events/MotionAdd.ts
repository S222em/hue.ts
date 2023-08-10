import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEMotionAddData } from '../../api/Motion';

export default function motionAdd(data: SSEMotionAddData, hue: Hue) {
	const motion = hue.motions._add(data);
	if (!motion) return;

	return () => hue.emit(Events.MotionAdd, motion);
}
