import { Resource } from './Resource';
import { APIResourceType } from '../api/ResourceType';
import { GeolocationManager } from '../managers/GeolocationManager';

export interface GeolocationEditOptions {
	longitude: number;
	latitude: number;
}

export class Geolocation extends Resource<APIResourceType.Geolocation> {
	type = APIResourceType.Geolocation;

	get manager(): GeolocationManager {
		return this.hue.geolocations;
	}

	public isConfigured(): boolean {
		return this.data.is_configured;
	}

	public async edit(options: GeolocationEditOptions): Promise<string> {
		return await this.manager.edit(this.id, options);
	}
}
