import { Manager } from './Manager';
import { APIResourceType } from '../api/ResourceType';
import { ZigbeeConnectivity } from '../structures/ZigbeeConnectivity';

/**
 * Manages the zigbee_connectivity resource
 */
export class ZigbeeConnectivityManager extends Manager<APIResourceType.ZigbeeConnectivity> {
	type = APIResourceType.ZigbeeConnectivity;
	holds = ZigbeeConnectivity;
}
