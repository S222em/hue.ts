import { ResourceType } from '../ResourceType';
import { ResourceIdentifier } from '../ResourceIdentifier';

export interface ZigbeeConnectivityGet {
	type?: ResourceType.ZigbeeConnectivity;
	id: string;
	owner: ResourceIdentifier;
	status: 'connected' | 'disconnected' | 'connectivity_issue' | 'unidirectional_incoming';
	mac_address: string;
}
