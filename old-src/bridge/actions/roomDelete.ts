import type { Bridge } from '../Bridge';
import { Events } from '../../util/Events';
import { ApiRoom } from '../../types/api/room';

export default function roomDelete(bridge: Bridge, data: ApiRoom) {
	const existing = bridge.rooms.cache.get(data.id);
	if (existing) {
		const room = existing._clone();
		if (bridge.rooms.cache.delete(data.id)) {
			bridge.emit(Events.RoomDelete, room);
		}
	}
}
