import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function roomDelete(data: any, bridge: Bridge) {
	const room = bridge.rooms.cache.get(data.id);
	if (!room) return;

	const clone = room._clone();

	bridge.rooms.cache.delete(data.id);

	return () => bridge.emit(Events.RoomDelete, clone);
}
