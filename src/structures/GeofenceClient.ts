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

export class GeofenceClient extends Resource<APIGeofenceClient> {
	type = APIResourceType.GeofenceClient;

	get name(): string {
		return this.data.name;
	}

	public async setAtHome(): Promise<string> {
		return await this.edit({ isAtHome: true });
	}

	public async setNotAtHome(): Promise<string> {
		return await this.edit({ isAtHome: false });
	}

	public async edit(options: GeofenceEditOptions): Promise<string> {
		return this.hue.geofenceClients.edit(this.id, options);
	}

	public async delete(): Promise<string> {
		return this.hue.geofenceClients.delete(this.id);
	}
}
