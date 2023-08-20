import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export default function motionAdd(data: SSEResource, hue: Hue) {
	const motion = hue.motions._add(data);
	if (!motion) return;

	return () => hue.emit(Events.MotionAdd, motion);
}
