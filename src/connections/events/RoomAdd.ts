import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEResource } from '../../types/sse';

export default function roomAdd(data: SSEResource, hue: Hue) {
	const room = hue.rooms._add(data);
	if (!room) return;

	return () => hue.emit(Events.RoomAdd, room);
}
