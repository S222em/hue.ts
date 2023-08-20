import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export default function deviceAdd(data: SSEResource, hue: Hue) {
	const device = hue.devices._add(data);

	return () => hue.emit(Events.DeviceAdd, device);
}
