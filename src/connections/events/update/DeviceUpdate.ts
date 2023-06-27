import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function deviceUpdate(data: any, hue: Hue) {
	const device = hue.devices.cache.get(data.id);
	if (!device) return;

	const clone = device._update(data);

	return () => hue.emit(Events.DeviceUpdate, device, clone);
}
