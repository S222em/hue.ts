import type { Bridge } from '../Bridge';
import type { ApiGroupedLight } from '../../api';
import { Events } from '../../util/Events';

export default function groupedLightUpdate(bridge: Bridge, data: ApiGroupedLight.Data) {
	const groupedLight = bridge.groupedLights.cache.get(data.id);
	if (groupedLight) {
		const old = groupedLight._update(data);
		bridge.emit(Events.GroupedLightUpdate, old, groupedLight);
	}
}
