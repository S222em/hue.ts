import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function zigbeeConnectivityUpdate(data: any, bridge: Bridge) {
	const zigbeeConnectivity = bridge.zigbeeConnectivities.cache.get(data.id);
	if (!zigbeeConnectivity) return;

	const clone = zigbeeConnectivity._update(data);

	return () => bridge.emit(Events.ZigbeeConnectivityUpdate, zigbeeConnectivity, clone);
}
