import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function groupedLightAdd(data: any, hue: Hue) {
	const groupedLight = hue.groupedLights._add(data);
	if (!groupedLight) return;

	return () => hue.emit(Events.GroupedLightAdd, groupedLight);
}
