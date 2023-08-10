import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEGroupedLightAddData } from '../../api/GroupedLight';

export default function groupedLightAdd(data: SSEGroupedLightAddData, hue: Hue) {
	const groupedLight = hue.groupedLights._add(data);
	if (!groupedLight) return;

	return () => hue.emit(Events.GroupedLightAdd, groupedLight);
}
