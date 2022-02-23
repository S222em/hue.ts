import type { Bridge } from '../Bridge';
import { Events } from '../../util/Events';
import type { ApiGroupedLight } from '../../types/api';

export default function groupedLightUpdate(bridge: Bridge, data: ApiGroupedLight) {
	const groupedLight = bridge.groupedLights.cache.get(data.id);
	if (groupedLight) {
		const old = groupedLight._update(data);
		bridge.emit(Events.GroupedLightUpdate, old, groupedLight);
	}
}
