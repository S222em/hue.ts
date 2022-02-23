import type { Bridge } from '../Bridge';
import { Events } from '../../util/Events';
import type { ApiGroupedLight } from '../../types/api';

export default function groupedLightDelete(bridge: Bridge, data: ApiGroupedLight) {
	const existing = bridge.groupedLights.cache.get(data.id);
	if (existing) {
		const groupedLight = existing._clone();
		if (bridge.groupedLights.cache.delete(data.id)) {
			bridge.emit(Events.GroupedLightDelete, groupedLight);
		}
	}
}
