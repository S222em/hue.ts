import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSERoomAddData } from '../../api/Room';

export default function roomAdd(data: SSERoomAddData, hue: Hue) {
	const room = hue.rooms._add(data);
	if (!room) return;

	return () => hue.emit(Events.RoomAdd, room);
}
