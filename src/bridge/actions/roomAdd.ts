import type { Bridge } from '../Bridge';
import { Events } from '../../util/Events';
import type { ApiRoom } from '../../types/api';

export default function roomAdd(bridge: Bridge, data: ApiRoom) {
	const existing = bridge.rooms.cache.get(data.id);
	const room = bridge.rooms._add(data);
	if (!existing && room) {
		bridge.emit(Events.RoomAdd, room);
	}
}
