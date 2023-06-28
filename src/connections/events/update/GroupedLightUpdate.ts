import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function groupedLightUpdate(data: any, hue: Hue) {
	const groupedLight = hue.groupedLights.cache.get(data.id);
	if (!groupedLight) return;

	const clone = groupedLight._update(data);

	return () => hue.emit(Events.GroupedLightUpdate, groupedLight, clone);
}
