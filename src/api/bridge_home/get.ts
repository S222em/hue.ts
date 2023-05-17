import { ApiResourceType } from '../ApiResourceType';
import { ResourceIdentifier } from '../ResourceIdentifier';

export interface ApiBridgeHomeGet {
	type?: ApiResourceType.BridgeHome;
	id: string;
	children: ResourceIdentifier[];
	services: ResourceIdentifier[];
}
