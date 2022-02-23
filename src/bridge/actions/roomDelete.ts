import type { Bridge } from '../Bridge';
import { Events } from '../../util/Events';
import type { ApiRoom } from '../../types/api';

export default function roomDelete(bridge: Bridge, data: ApiRoom) {
	const existing = bridge.rooms.cache.get(data.id);
	if (existing) {
		const room = existing._clone();
		if (bridge.rooms.cache.delete(data.id)) {
			bridge.emit(Events.RoomDelete, room);
		}
	}
}
