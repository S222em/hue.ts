import { ResourceType } from '../ResourceType';
import { ResourceIdentifier } from '../ResourceIdentifier';

export interface ZigbeeDeviceDiscoveryGet {
	type?: ResourceType.ZigbeeDeviceDiscovery;
	id: string;
	owner: ResourceIdentifier;
	status: 'active' | 'ready';
}
