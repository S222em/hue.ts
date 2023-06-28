import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function roomDelete(data: any, hue: Hue) {
	const room = hue.rooms.cache.get(data.id);
	if (!room) return;

	const clone = room._clone();

	hue.rooms.cache.delete(data.id);

	return () => hue.emit(Events.RoomDelete, clone);
}
