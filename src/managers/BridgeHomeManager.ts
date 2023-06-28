import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { BridgeHome } from '../structures/BridgeHome';

export class BridgeHomeManager extends Manager<ResourceType.BridgeHome> {
	type = ResourceType.BridgeHome;
	holds = BridgeHome;
}
