import { ResourceManager } from './ResourceManager';
import { APIResourceType } from '../types/api';
import { ZigbeeConnectivity } from '../structures/ZigbeeConnectivity';

/**
 * Manages the zigbee_connectivity resource
 */
export class ZigbeeConnectivityManager extends ResourceManager<ZigbeeConnectivity> {
	type = APIResourceType.ZigbeeConnectivity;
	holds = ZigbeeConnectivity;
}
