import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function roomDelete(data: any, bridge: Bridge) {
	const room = bridge.rooms._cache.get(data.id);
	if (!room) return;

	const clone = room._clone();

	bridge.rooms._cache.delete(data.id);

	bridge.emit(Events.RoomDelete, clone);
}
