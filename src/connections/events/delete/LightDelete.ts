import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function lightDelete(data: any, hue: Hue) {
	const light = hue.lights.cache.get(data.id);
	if (!light) return;

	const clone = light._clone();

	hue.devices.cache.delete(data.id);

	return () => hue.emit(Events.LightDelete, clone);
}
