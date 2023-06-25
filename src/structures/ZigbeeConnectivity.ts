import { Resource } from './Resource';
import { ResourceType } from '../api/ResourceType';
import { ZigbeeConnectivityManager } from '../managers/ZigbeeConnectivityManager';

export enum ZigbeeConnectivityStatus {
	Connected = 'connected',
	Disconnected = 'disconnected',
	Connectivity_issue = 'connectivity_issue',
	UnidirectionalIncoming = 'unidirectional_incoming',
}

export class ZigbeeConnectivity extends Resource<ResourceType.ZigbeeConnectivity> {
	type = ResourceType.ZigbeeConnectivity;

	get manager(): ZigbeeConnectivityManager {
		return this.bridge.zigbeeConnectivities;
	}

	get ownerId(): string {
		return this.data.owner.rid;
	}

	get status(): ZigbeeConnectivityStatus {
		return this.data.status as ZigbeeConnectivityStatus;
	}

	get macAddress(): string {
		return this.data.mac_address;
	}
}
