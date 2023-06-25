import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function zigbeeConnectivityDelete(data: any, bridge: Bridge) {
	const zigbeeConnectivity = bridge.zigbeeConnectivities.cache.get(data.id);
	if (!zigbeeConnectivity) return;

	const clone = zigbeeConnectivity._clone();

	bridge.zigbeeConnectivities.cache.delete(data.id);

	return () => bridge.emit(Events.ZigbeeConnectivityDelete, clone);
}
