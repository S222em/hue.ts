import type { Bridge } from '../Bridge';
import { Events } from '../../util/Events';
import { ApiRoom } from '../../types/api/room';

export default function roomAdd(bridge: Bridge, data: ApiRoom) {
	const existing = bridge.rooms.cache.get(data.id);
	const room = bridge.rooms._add(data);
	if (!existing && room) {
		bridge.emit(Events.RoomAdd, room);
	}
}
