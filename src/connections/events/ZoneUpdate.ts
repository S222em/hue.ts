import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEResource } from '../../types/sse';

export default function zoneUpdate(data: SSEResource, hue: Hue) {
	const zone = hue.zones.cache.get(data.id);
	if (!zone) return;

	const clone = zone._update(data);

	return () => hue.emit(Events.ZoneUpdate, zone, clone);
}
