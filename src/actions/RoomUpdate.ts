import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export default function roomUpdate(data: SSEResource, hue: Hue) {
	const room = hue.rooms.cache.get(data.id);
	if (!room) return;

	const clone = room._update(data);

	return () => hue.emit(Events.RoomUpdate, room, clone);
}
