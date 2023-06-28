import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { ZigbeeConnectivity } from '../structures/ZigbeeConnectivity';

export class ZigbeeConnectivityManager extends Manager<ResourceType.ZigbeeConnectivity> {
	type = ResourceType.ZigbeeConnectivity;
	holds = ZigbeeConnectivity;
}
