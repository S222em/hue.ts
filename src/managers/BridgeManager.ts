import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { Bridge } from '../structures/Bridge';

/**
 * Manages the bridge resource
 */
export class BridgeManager extends Manager<ResourceType.Bridge> {
	type = ResourceType.Bridge;
	holds = Bridge;
}
