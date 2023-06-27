import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function lightUpdate(data: any, hue: Hue) {
	const light = hue.lights.cache.get(data.id);
	if (!light) return;

	const clone = light._update(data);

	return () => hue.emit(Events.LightUpdate, light, clone);
}
