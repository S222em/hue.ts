import type { Bridge } from '../Bridge';
import { Events } from '../../util/Events';
import { ApiGroupedLight } from '../../types/api/grouped_light';

export default function groupedLightAdd(bridge: Bridge, data: ApiGroupedLight) {
	const existing = bridge.groupedLights.cache.get(data.id);
	const room = bridge.groupedLights._add(data);
	if (!existing && room) {
		bridge.emit(Events.GroupedLightAdd, room);
	}
}
