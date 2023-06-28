import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function roomUpdate(data: any, hue: Hue) {
	const room = hue.rooms.cache.get(data.id);
	if (!room) return;

	const clone = room._update(data);

	return () => hue.emit(Events.RoomUpdate, room, clone);
}
