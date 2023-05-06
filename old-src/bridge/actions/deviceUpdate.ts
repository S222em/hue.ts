import type { Bridge } from '../Bridge';
import { Events } from '../../util/Events';
import { ApiDevice } from '../../types/api/device';

export default function deviceUpdate(bridge: Bridge, data: ApiDevice) {
	const device = bridge.devices.cache.get(data.id);
	if (device) {
		const old = device._update(data);
		bridge.emit(Events.DeviceUpdate, old, device);
	}
}
