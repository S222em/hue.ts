import type { Bridge } from '../Bridge';
import type { ApiRoom } from '../../api';
import { Events } from '../../util/Events';

export default function roomAdd(bridge: Bridge, data: ApiRoom.Data) {
	const existing = bridge.rooms.cache.get(data.id);
	const room = bridge.rooms._add(data);
	if (!existing && room) {
		bridge.emit(Events.RoomAdd, room);
	}
}
