import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function roomAdd(data: any, hue: Hue) {
	const room = hue.rooms._add(data);
	if (!room) return;

	return () => hue.emit(Events.RoomAdd, room);
}
