import { Manager } from './Manager';
import { APIResourceType } from '../api/ResourceType';
import { Bridge } from '../structures/Bridge';

/**
 * Manages the bridge resource
 */
export class BridgeManager extends Manager<APIResourceType.Bridge> {
	type = APIResourceType.Bridge;
	holds = Bridge;
}
