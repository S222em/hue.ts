import { ResourceManager } from './ResourceManager';
import { APIResourceType } from '../types/api';
import { Bridge } from '../structures/Bridge';

/**
 * Manages the bridge resource
 */
export class BridgeManager extends ResourceManager<Bridge> {
	type = APIResourceType.Bridge;
	holds = Bridge;
}
