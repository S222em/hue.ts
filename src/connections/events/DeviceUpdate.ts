import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEDeviceUpdateData } from '../../api/Device';

export default function deviceUpdate(data: SSEDeviceUpdateData, hue: Hue) {
	const device = hue.devices.cache.get(data.id);
	if (!device) return;

	const clone = device._update(data);

	return () => hue.emit(Events.DeviceUpdate, device, clone);
}
