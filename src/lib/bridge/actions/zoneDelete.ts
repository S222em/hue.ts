import type { Bridge } from '../Bridge';
import type { ApiZone } from '../../../api';
import { Events } from '../../util/Events';

export default function zoneDelete(bridge: Bridge, data: ApiZone.Data) {
	const existing = bridge.zones.cache.get(data.id);
	if (existing) {
		const zone = existing._clone();
		if (bridge.zones.cache.delete(data.id)) {
			bridge.emit(Events.ZoneDelete, zone);
		}
	}
}
