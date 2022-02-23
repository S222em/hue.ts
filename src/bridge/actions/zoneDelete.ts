import type { Bridge } from '../Bridge';
import { Events } from '../../util/Events';
import type { ApiZone } from '../../types/api';

export default function zoneDelete(bridge: Bridge, data: ApiZone) {
	const existing = bridge.zones.cache.get(data.id);
	if (existing) {
		const zone = existing._clone();
		if (bridge.zones.cache.delete(data.id)) {
			bridge.emit(Events.ZoneDelete, zone);
		}
	}
}
