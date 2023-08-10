import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSELightUpdateData } from '../../api/Light';

export default function lightUpdate(data: SSELightUpdateData, hue: Hue) {
	const light = hue.lights.cache.get(data.id);
	if (!light) return;

	const clone = light._update(data);

	return () => hue.emit(Events.LightUpdate, light, clone);
}
