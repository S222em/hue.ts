import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function zoneAdd(data: any, hue: Hue) {
	const zone = hue.zones._add(data);
	if (!zone) return;

	return () => hue.emit(Events.ZoneAdd, zone);
}
