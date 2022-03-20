import type { Bridge } from '../Bridge';
import { Events } from '../../util/Events';
import { ApiRoom } from '../../types/api/room';

export default function roomUpdate(bridge: Bridge, data: ApiRoom) {
	const room = bridge.rooms.cache.get(data.id);
	if (room) {
		const old = room._update(data);
		bridge.emit(Events.RoomUpdate, old, room);
	}
}
