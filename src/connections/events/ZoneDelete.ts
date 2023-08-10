import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEZoneDeleteData } from '../../api/Zone';

export default function zoneDelete(data: SSEZoneDeleteData, hue: Hue) {
	const zone = hue.zones.cache.get(data.id);
	if (!zone) return;

	const clone = zone._clone();

	hue.zones.cache.delete(data.id);

	return () => hue.emit(Events.ZoneDelete, clone);
}
