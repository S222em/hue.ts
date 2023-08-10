import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEZigbeeConnectivityUpdateData } from '../../api/ZigbeeConnectivity';

export default function zigbeeConnectivityUpdate(data: SSEZigbeeConnectivityUpdateData, hue: Hue) {
	const zigbeeConnectivity = hue.zigbeeConnectivities.cache.get(data.id);
	if (!zigbeeConnectivity) return;

	const clone = zigbeeConnectivity._update(data);

	return () => hue.emit(Events.ZigbeeConnectivityUpdate, zigbeeConnectivity, clone);
}
