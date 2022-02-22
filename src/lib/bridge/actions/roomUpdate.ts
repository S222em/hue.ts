import type { Bridge } from '../Bridge';
import type { ApiRoom } from '../../../api';
import { Events } from '../../util/Events';

export default function roomUpdate(bridge: Bridge, data: ApiRoom.Object) {
	const room = bridge.rooms.cache.get(data.id);
	if (room) {
		const old = room._update(data);
		bridge.emit(Events.RoomUpdate, old, room);
	}
}
