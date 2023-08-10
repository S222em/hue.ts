import { Resource } from './Resource';
import { APIResourceType } from '../api/ResourceType';
import { ZigbeeConnectivityManager } from '../managers/ZigbeeConnectivityManager';

export enum ZigbeeConnectivityStatus {
	Connected = 'connected',
	Disconnected = 'disconnected',
	Connectivity_issue = 'connectivity_issue',
	UnidirectionalIncoming = 'unidirectional_incoming',
}

export class ZigbeeConnectivity extends Resource<APIResourceType.ZigbeeConnectivity> {
	type = APIResourceType.ZigbeeConnectivity;

	get manager(): ZigbeeConnectivityManager {
		return this.hue.zigbeeConnectivities;
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
