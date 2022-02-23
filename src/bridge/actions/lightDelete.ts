import type { Bridge } from '../Bridge';
import { Events } from '../../util/Events';
import type { ApiLight } from '../../types/api';

export default function lightDelete(bridge: Bridge, data: ApiLight) {
	const existing = bridge.lights.cache.get(data.id);
	if (existing) {
		const light = existing._clone();
		if (bridge.lights.cache.delete(data.id)) {
			bridge.emit(Events.LightDelete, light);
		}
	}
}
