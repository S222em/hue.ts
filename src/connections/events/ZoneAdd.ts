import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEResource } from '../../types/sse';

export default function zoneAdd(data: SSEResource, hue: Hue) {
	const zone = hue.zones._add(data);
	if (!zone) return;

	return () => hue.emit(Events.ZoneAdd, zone);
}
