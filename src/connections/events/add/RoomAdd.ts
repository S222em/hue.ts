import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function roomAdd(data: any, bridge: Bridge) {
	const room = bridge.rooms._add(data);
	if (!room) return;

	return () => bridge.emit(Events.RoomAdd, room);
}
