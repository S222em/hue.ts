import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export default function roomDelete(data: SSEResource, hue: Hue) {
	const room = hue.rooms.cache.get(data.id);
	if (!room) return;

	const clone = room._clone();

	hue.rooms.cache.delete(data.id);

	return () => hue.emit(Events.RoomDelete, clone);
}
