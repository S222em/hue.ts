import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEZoneAddData } from '../../api/Zone';

export default function zoneAdd(data: SSEZoneAddData, hue: Hue) {
	const zone = hue.zones._add(data);
	if (!zone) return;

	return () => hue.emit(Events.ZoneAdd, zone);
}
