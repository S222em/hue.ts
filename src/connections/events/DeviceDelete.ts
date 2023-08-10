import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEDeviceDeleteData } from '../../api/Device';

export default function deviceDelete(data: SSEDeviceDeleteData, hue: Hue) {
	const device = hue.devices.cache.get(data.id);
	if (!device) return;

	const clone = device._clone();

	hue.devices.cache.delete(data.id);

	return () => hue.emit(Events.DeviceDelete, clone);
}
