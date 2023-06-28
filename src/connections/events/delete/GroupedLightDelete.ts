import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function groupedLightDelete(data: any, hue: Hue) {
	const groupedLight = hue.groupedLights.cache.get(data.id);
	if (!groupedLight) return;

	const clone = groupedLight._clone();

	hue.groupedLights.cache.delete(data.id);

	return () => hue.emit(Events.GroupedLightDelete, clone);
}
