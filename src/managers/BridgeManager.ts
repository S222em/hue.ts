import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { Bridge } from '../structures/Bridge';

export class BridgeManager extends Manager<ResourceType.Bridge> {
	type = ResourceType.Bridge;
	holds = Bridge;
}
