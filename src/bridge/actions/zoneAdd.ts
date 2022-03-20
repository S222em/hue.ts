import type { Bridge } from '../Bridge';
import { Events } from '../../util/Events';
import { ApiZone } from '../../types/api/zone';

export default function zoneAdd(bridge: Bridge, data: ApiZone) {
	const existing = bridge.zones.cache.get(data.id);
	const zone = bridge.zones._add(data);
	if (!existing && zone) {
		bridge.emit(Events.ZoneAdd, zone);
	}
}
