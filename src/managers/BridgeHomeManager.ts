import { Manager } from './Manager';
import { APIResourceType } from '../api/ResourceType';
import { BridgeHome } from '../structures/BridgeHome';

/**
 * Manages the bridge_home resource
 */
export class BridgeHomeManager extends Manager<APIResourceType.BridgeHome> {
	type = APIResourceType.BridgeHome;
	holds = BridgeHome;
}
