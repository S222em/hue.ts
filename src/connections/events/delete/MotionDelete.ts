import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function motionDelete(data: any, hue: Hue) {
	const motion = hue.motions.cache.get(data.id);
	if (!motion) return;

	const clone = motion._clone();

	hue.devices.cache.delete(data.id);

	return () => hue.emit(Events.MotionDelete, clone);
}
