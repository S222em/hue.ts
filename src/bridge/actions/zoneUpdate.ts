import type { Bridge } from '../Bridge';
import type { ApiZone } from '../../api';
import { Events } from '../../util/Events';

export default function zoneUpdate(bridge: Bridge, data: ApiZone.Data) {
	const zone = bridge.zones.cache.get(data.id);
	if (zone) {
		const old = zone._update(data);
		bridge.emit(Events.ZoneUpdate, old, zone);
	}
}
