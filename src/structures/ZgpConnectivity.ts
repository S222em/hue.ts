import { Resource } from './Resource';
import { APIResource, APIResourceIdentifier, APIResourceType } from '../types/api';

/**
 * Represents the zgp_connectivity resource from the hue API
 */
export class ZgpConnectivity extends Resource<APIZgpConnectivity> {
	type = APIResourceType.ZgpConnectivity;

	/**
	 * ID of this zgp connectivities owner
	 */
	get ownerId(): string {
		return this.data.owner.rid;
	}

	/**
	 * Status of the zgp connection
	 */
	get status(): APIZgpConnectivityStatus {
		return this.data.status;
	}

	/**
	 * The ID of the source
	 */
	get sourceId(): string {
		return this.data.source_id;
	}
}

export enum APIZgpConnectivityStatus {
	Connected = 'connected',
	Disconnected = 'disconnected',
	Connectivity_issue = 'connectivity_issue',
	UnidirectionalIncoming = 'unidirectional_incoming',
}

export interface APIZgpConnectivity extends APIResource<APIResourceType.ZgpConnectivity> {
	owner: APIResourceIdentifier;
	status: APIZgpConnectivityStatus;
	source_id: string;
}
