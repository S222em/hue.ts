import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function zigbeeConnectivityAdd(data: any, hue: Hue) {
	const zigbeeConnectivity = hue.zigbeeConnectivities._add(data);
	if (!zigbeeConnectivity) return;

	return () => hue.emit(Events.ZigbeeConnectivityAdd, zigbeeConnectivity);
}
