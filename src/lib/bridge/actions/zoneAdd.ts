import type { Bridge } from '../Bridge';
import type { ApiZone } from '../../../api';
import { Events } from '../../util/Events';

export default function zoneAdd(bridge: Bridge, data: ApiZone.Data) {
	const existing = bridge.zones.cache.get(data.id);
	const zone = bridge.zones._add(data);
	if (!existing && zone) {
		bridge.emit(Events.ZoneAdd, zone);
	}
}
