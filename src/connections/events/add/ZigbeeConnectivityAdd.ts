import { Bridge } from '../../../bridge/Bridge';
import { Events } from '../../../bridge/BridgeEvents';

export default function zigbeeConnectivityAdd(data: any, bridge: Bridge) {
	const zigbeeConnectivity = bridge.zigbeeConnectivities._add(data);
	if (!zigbeeConnectivity) return;

	return () => bridge.emit(Events.ZigbeeConnectivityAdd, zigbeeConnectivity);
}
