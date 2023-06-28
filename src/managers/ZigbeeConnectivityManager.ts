import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { ZigbeeConnectivity } from '../structures/ZigbeeConnectivity';

/**
 * Manages the zigbee_connectivity resource
 */
export class ZigbeeConnectivityManager extends Manager<ResourceType.ZigbeeConnectivity> {
	type = ResourceType.ZigbeeConnectivity;
	holds = ZigbeeConnectivity;
}
