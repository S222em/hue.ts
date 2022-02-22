import type { Bridge } from '../Bridge';
import type { ApiRoom } from '../../../api';
import { Events } from '../../util/Events';

export default function roomDelete(bridge: Bridge, data: ApiRoom.Object) {
	const existing = bridge.rooms.cache.get(data.id);
	if (existing) {
		const room = existing._clone();
		if (bridge.rooms.cache.delete(data.id)) {
			bridge.emit(Events.RoomDelete, room);
		}
	}
}
