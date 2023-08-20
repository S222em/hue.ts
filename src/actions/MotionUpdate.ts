import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export default function motionUpdate(data: SSEResource, hue: Hue) {
	const motion = hue.motions.cache.get(data.id);
	if (!motion) return;

	const clone = motion._update(data);

	return () => hue.emit(Events.MotionUpdate, motion, clone);
}
