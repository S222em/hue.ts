import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSELightDeleteData } from '../../api/Light';

export default function lightDelete(data: SSELightDeleteData, hue: Hue) {
	const light = hue.lights.cache.get(data.id);
	if (!light) return;

	const clone = light._clone();

	hue.lights.cache.delete(data.id);

	return () => hue.emit(Events.LightDelete, clone);
}
