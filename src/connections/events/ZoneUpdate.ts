import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEZoneUpdateData } from '../../api/Zone';

export default function zoneUpdate(data: SSEZoneUpdateData, hue: Hue) {
	const zone = hue.zones.cache.get(data.id);
	if (!zone) return;

	const clone = zone._update(data);

	return () => hue.emit(Events.ZoneUpdate, zone, clone);
}
