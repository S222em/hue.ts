import type { Bridge } from '../Bridge';
import { Events } from '../../util/Events';
import { ApiDevice } from '../../types/api/device';

export default function deviceAdd(bridge: Bridge, data: ApiDevice) {
	const existing = bridge.devices.cache.get(data.id);
	const device = bridge.devices._add(data);
	if (!existing && device) {
		bridge.emit(Events.DeviceAdd, device);
	}
}
