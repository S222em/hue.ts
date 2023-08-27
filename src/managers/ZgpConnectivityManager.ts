import { ResourceManager } from './ResourceManager';
import { APIResourceType } from '../types/api';
import { ZgpConnectivity } from '../structures/ZgpConnectivity';

/**
 * Manages the zgp_connectivity resource
 */
export class ZgpConnectivityManager extends ResourceManager<ZgpConnectivity> {
	type = APIResourceType.ZgpConnectivity;
	holds = ZgpConnectivity;
}
