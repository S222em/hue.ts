import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function roomAdd(data: any, bridge: Bridge) {
	const room = bridge.rooms._create(data);
	if (!room) return;

	bridge.emit(Events.RoomAdd, room);
}
