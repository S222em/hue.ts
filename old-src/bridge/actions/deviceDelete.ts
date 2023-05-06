import type { Bridge } from '../Bridge';
import { Events } from '../../util/Events';
import { ApiDevice } from '../../types/api/device';

export default function deviceDelete(bridge: Bridge, data: ApiDevice) {
	const existing = bridge.devices.cache.get(data.id);
	if (existing) {
		const device = existing._clone();
		if (bridge.devices.cache.delete(data.id)) {
			bridge.emit(Events.DeviceDelete, device);
		}
	}
}
