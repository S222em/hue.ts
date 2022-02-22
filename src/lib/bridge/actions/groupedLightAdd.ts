import type { Bridge } from '../Bridge';
import type { ApiGroupedLight } from '../../../api';
import { Events } from '../../util/Events';

export default function groupedLightAdd(bridge: Bridge, data: ApiGroupedLight.Object) {
	const existing = bridge.groupedLights.cache.get(data.id);
	const room = bridge.groupedLights._add(data);
	if (!existing && room) {
		bridge.emit(Events.GroupedLightAdd, room);
	}
}
