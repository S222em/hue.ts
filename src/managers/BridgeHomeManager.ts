import { ResourceManager } from './ResourceManager';
import { APIResourceType } from '../types/api';
import { BridgeHome } from '../structures/BridgeHome';

/**
 * Manages the bridge_home resource
 */
export class BridgeHomeManager extends ResourceManager<BridgeHome> {
	type = APIResourceType.BridgeHome;
	holds = BridgeHome;
}
