import type { Bridge } from '../Bridge';
import { Events } from '../../util/Events';
import type { ApiRoom } from '../../types/api';

export default function roomUpdate(bridge: Bridge, data: ApiRoom) {
	const room = bridge.rooms.cache.get(data.id);
	if (room) {
		const old = room._update(data);
		bridge.emit(Events.RoomUpdate, old, room);
	}
}
