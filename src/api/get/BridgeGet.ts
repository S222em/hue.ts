import { ResourceType } from '../ResourceType';
import { ResourceIdentifier } from '../ResourceIdentifier';

export interface BridgeGet {
	type?: ResourceType.Bridge;
	id: string;
	owner: ResourceIdentifier;
	bridge_id: string;
	time_zone: {
		time_zone: string;
	};
}
