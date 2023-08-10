import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEDeviceAddData } from '../../api/Device';

export default function deviceAdd(data: SSEDeviceAddData, hue: Hue) {
	const device = hue.devices._add(data);
	if (!device) return;

	return () => hue.emit(Events.DeviceAdd, device);
}
