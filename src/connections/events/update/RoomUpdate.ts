import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function roomUpdate(data: any, bridge: Bridge) {
	const room = bridge.rooms._cache.get(data.id);
	if (!room) return;

	const clone = room._update(data);

	bridge.emit(Events.RoomUpdate, room, clone);
}
