import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function zoneDelete(data: any, hue: Hue) {
	const zone = hue.zones.cache.get(data.id);
	if (!zone) return;

	const clone = zone._clone();

	hue.zones.cache.delete(data.id);

	return () => hue.emit(Events.ZoneDelete, clone);
}
