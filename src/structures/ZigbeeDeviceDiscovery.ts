import { Resource } from './Resource';
import { APIResource, APIResourceIdentifier, APIResourceType } from '../types/api';

export interface APIZigbeeDeviceDiscovery extends APIResource<APIResourceType.ZigbeeDeviceDiscovery> {
	owner: APIResourceIdentifier;
	status: 'active' | 'ready';
}

export enum ZigbeeDeviceDiscoveryStatus {
	Active = 'active',
	Ready = 'ready',
}

export enum ZigbeeDeviceDiscoveryActionType {
	Search = 'search',
}

export interface ZigbeeDeviceDiscoveryEditOptions {
	actionType: ZigbeeDeviceDiscoveryActionType;
}

/**
 * Represents the zigbee_device_discovery resource from the hue API
 */
export class ZigbeeDeviceDiscovery extends Resource<APIZigbeeDeviceDiscovery> {
	type = APIResourceType.ZigbeeDeviceDiscovery;

	/**
	 * ID of this zigbee device discovery owner
	 */
	get ownerId(): string {
		return this.data.owner.rid;
	}

	/**
	 * Status of this zigbee device discovery
	 * Will be 'active' when searching for new devices
	 */
	get status(): ZigbeeDeviceDiscoveryStatus {
		return this.data.status as ZigbeeDeviceDiscoveryStatus;
	}

	/**
	 * Starts a search for new devices
	 */
	public async search(): Promise<string> {
		return await this.edit({ actionType: ZigbeeDeviceDiscoveryActionType.Search });
	}

	/**
	 * Edits this zigbee device discovery
	 * @param options
	 */
	public async edit(options: ZigbeeDeviceDiscoveryEditOptions): Promise<string> {
		return await this.hue.zigbeeDeviceDiscoveries.edit(this.id, options);
	}
}
