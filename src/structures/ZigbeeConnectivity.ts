import { Resource } from './Resource';
import { APIResource, APIResourceIdentifier, APIResourceType } from '../types/api';

export interface APIZigbeeConnectivity extends APIResource<APIResourceType.ZigbeeConnectivity> {
	owner: APIResourceIdentifier;
	status: 'connected' | 'disconnected' | 'connectivity_issue' | 'unidirectional_incoming';
	mac_address: string;
}

export enum ZigbeeConnectivityStatus {
	Connected = 'connected',
	Disconnected = 'disconnected',
	Connectivity_issue = 'connectivity_issue',
	UnidirectionalIncoming = 'unidirectional_incoming',
}

/**
 * Represents the zigbee_connectivity resource from the hue API
 */
export class ZigbeeConnectivity extends Resource<APIZigbeeConnectivity> {
	type = APIResourceType.ZigbeeConnectivity;

	/**
	 * ID of this zigbee connectivities owner
	 */
	get ownerId(): string {
		return this.data.owner.rid;
	}

	/**
	 * Status of the zigbee connection
	 */
	get status(): ZigbeeConnectivityStatus {
		return this.data.status as ZigbeeConnectivityStatus;
	}

	/**
	 * The MAC address of the zigbee connection
	 */
	get macAddress(): string {
		return this.data.mac_address;
	}
}
