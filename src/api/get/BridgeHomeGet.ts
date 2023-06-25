import { ResourceType } from '../ResourceType';
import { ResourceIdentifier } from '../ResourceIdentifier';

export interface BridgeHomeGet {
	type?: ResourceType.BridgeHome;
	id: string;
	children: ResourceIdentifier[];
	services: ResourceIdentifier[];
}
