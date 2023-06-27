import { ResourceType } from '../ResourceType';

export interface ZigbeeDeviceDiscoveryPut {
	type?: ResourceType.ZigbeeDeviceDiscovery;
	action: {
		action_type: 'search';
		// TODO not properly documented, type is unknown
		search_codes: Array<unknown>;
		install_codes: Array<unknown>;
	};
}
