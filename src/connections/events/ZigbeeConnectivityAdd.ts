import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEZigbeeConnectivityAddData } from '../../api/ZigbeeConnectivity';

export default function zigbeeConnectivityAdd(data: SSEZigbeeConnectivityAddData, hue: Hue) {
	const zigbeeConnectivity = hue.zigbeeConnectivities._add(data);
	if (!zigbeeConnectivity) return;

	return () => hue.emit(Events.ZigbeeConnectivityAdd, zigbeeConnectivity);
}
