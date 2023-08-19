import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEResource } from '../../types/sse';

export default function deviceAdd(data: SSEResource, hue: Hue) {
	const device = hue.devices._add(data);
	if (!device) return;

	return () => hue.emit(Events.DeviceAdd, device);
}
