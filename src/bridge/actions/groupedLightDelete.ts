import type { Bridge } from '../Bridge';
import { Events } from '../../util/Events';
import { ApiGroupedLight } from '../../types/api/grouped_light';

export default function groupedLightDelete(bridge: Bridge, data: ApiGroupedLight) {
	const existing = bridge.groupedLights.cache.get(data.id);
	if (existing) {
		const groupedLight = existing._clone();
		if (bridge.groupedLights.cache.delete(data.id)) {
			bridge.emit(Events.GroupedLightDelete, groupedLight);
		}
	}
}
