import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export function motionAdd(data: SSEResource, hue: Hue) {
	const motion = hue.motions._add(data);

	return () => hue.emit(Events.MotionAdd, motion);
}

export function motionUpdate(data: SSEResource, hue: Hue) {
	const motion = hue.motions.cache.get(data.id);
	if (!motion) return;

	const clone = motion._update(data);

	return () => hue.emit(Events.MotionUpdate, motion, clone);
}

export function motionDelete(data: SSEResource, hue: Hue) {
	const motion = hue.motions.cache.get(data.id);
	if (!motion) return;

	const clone = motion._clone();

	hue.devices.cache.delete(data.id);

	return () => hue.emit(Events.MotionDelete, clone);
}
