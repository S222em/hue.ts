import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function deviceAdd(data: any, hue: Hue) {
	const device = hue.devices._add(data);
	if (!device) return;

	return () => hue.emit(Events.DeviceAdd, device);
}
