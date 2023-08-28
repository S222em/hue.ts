import { Resource } from './Resource';
import { APIResource, APIResourceIdentifier, APIResourceType } from '../types/api';
import { BridgeHomeManager } from '../managers/BridgeHomeManager';

/**
 * Represents the bridge_home resource from the hue API
 */
export class BridgeHome extends Resource<APIBridgeHome> {
	type = APIResourceType.BridgeHome;

	get manager(): BridgeHomeManager {
		return this.hue.bridgeHomes;
	}

	/**
	 * Children of this bridge home
	 */
	get childrenIds(): string[] {
		return this.data.children.map((child) => child.rid);
	}

	/**
	 * Services of this bridge home
	 */
	get serviceIds(): string[] {
		return this.data.services.map((service) => service.rid);
	}
}

export interface APIBridgeHome extends APIResource<APIResourceType.BridgeHome> {
	children: APIResourceIdentifier[];
	services: APIResourceIdentifier[];
}
