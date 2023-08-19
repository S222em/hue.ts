import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEResource } from '../../types/sse';

export default function deviceDelete(data: SSEResource, hue: Hue) {
	const device = hue.devices.cache.get(data.id);
	if (!device) return;

	const clone = device._clone();

	hue.devices.cache.delete(data.id);

	return () => hue.emit(Events.DeviceDelete, clone);
}
