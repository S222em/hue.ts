import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEGroupedLightDeleteData } from '../../api/GroupedLight';

export default function groupedLightDelete(data: SSEGroupedLightDeleteData, hue: Hue) {
	const groupedLight = hue.groupedLights.cache.get(data.id);
	if (!groupedLight) return;

	const clone = groupedLight._clone();

	hue.groupedLights.cache.delete(data.id);

	return () => hue.emit(Events.GroupedLightDelete, clone);
}
