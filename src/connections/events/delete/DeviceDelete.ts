import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function deviceDelete(data: any, hue: Hue) {
	const device = hue.devices.cache.get(data.id);
	if (!device) return;

	const clone = device._clone();

	hue.devices.cache.delete(data.id);

	return () => hue.emit(Events.DeviceDelete, clone);
}
