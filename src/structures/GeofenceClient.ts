import { Resource } from './Resource';
import { APIResource, APIResourceType } from '../types/api';

export interface APIGeofenceClient extends APIResource<APIResourceType.GeofenceClient> {
	name: string;
}

export interface GeofenceEditOptions {
	isAtHome?: boolean;
	name?: string;
}

export interface GeofenceCreateOptions {
	isAtHome?: boolean;
	name?: string;
}

/**
 * Represents the geofence_client resource from the hue API
 */
export class GeofenceClient extends Resource<APIGeofenceClient> {
	type = APIResourceType.GeofenceClient;

	/**
	 * The name of this geofence client
	 */
	get name(): string {
		return this.data.name;
	}

	/**
	 * Sets this geofence client's location to at home
	 */
	public async setAtHome(): Promise<string> {
		return await this.edit({ isAtHome: true });
	}

	/**
	 * Sets this geofence client's location to not at home
	 */
	public async setNotAtHome(): Promise<string> {
		return await this.edit({ isAtHome: false });
	}

	/**
	 * Edits this geofence client
	 * @param options
	 */
	public async edit(options: GeofenceEditOptions): Promise<string> {
		return this.hue.geofenceClients.edit(this.id, options);
	}

	/**
	 * Deletes this geofence client
	 */
	public async delete(): Promise<string> {
		return this.hue.geofenceClients.delete(this.id);
	}
}
