import { Resource } from './Resource';
import { APIResource, APIResourceIdentifier, APIResourceType } from '../types/api';

export interface APIBridge extends APIResource<APIResourceType.Bridge> {
	owner: APIResourceIdentifier;
	bridge_id: string;
	time_zone: {
		time_zone: string;
	};
}

/**
 * Represents the bridge resource from the hue API
 */
export class Bridge extends Resource<APIBridge> {
	type = APIResourceType.Bridge;

	/**
	 * ID of this bridge's owner
	 */
	get ownerId(): string {
		return this.data.owner.rid;
	}

	/**
	 * The unique ID of this bridge
	 * This ID is given by the manufacturer
	 */
	get bridgeId(): string {
		return this.data.bridge_id;
	}

	/**
	 * The time zone this bridge is in (or set to)
	 */
	get timeZone(): string {
		return this.data.time_zone.time_zone;
	}
}
