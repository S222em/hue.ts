import type { Bridge } from '../Bridge';
import type { ApiRoom } from '../../api';
import { Events } from '../../util/Events';

export default function lightDelete(bridge: Bridge, data: ApiRoom.Data) {
	const existing = bridge.lights.cache.get(data.id);
	if (existing) {
		const light = existing._clone();
		if (bridge.lights.cache.delete(data.id)) {
			bridge.emit(Events.LightDelete, light);
		}
	}
}
