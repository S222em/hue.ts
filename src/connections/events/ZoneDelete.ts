import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEResource } from '../../types/sse';

export default function zoneDelete(data: SSEResource, hue: Hue) {
	const zone = hue.zones.cache.get(data.id);
	if (!zone) return;

	const clone = zone._clone();

	hue.zones.cache.delete(data.id);

	return () => hue.emit(Events.ZoneDelete, clone);
}
