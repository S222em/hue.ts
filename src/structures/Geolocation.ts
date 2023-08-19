import { Resource } from './Resource';
import { APIResource, APIResourceType } from '../types/api';

export interface APIGeolocation extends APIResource<APIResourceType.Geolocation> {
	is_configured: boolean;
}

export interface GeolocationEditOptions {
	longitude: number;
	latitude: number;
}

/**
 * Represents the geolocation resource from the hue API
 */
export class Geolocation extends Resource<APIGeolocation> {
	type = APIResourceType.Geolocation;

	/**
	 * Whether this geolocation is configured
	 */
	public isConfigured(): boolean {
		return this.data.is_configured;
	}

	/**
	 * Edits this geolocation
	 * @param options
	 */
	public async edit(options: GeolocationEditOptions): Promise<string> {
		return await this.hue.geolocations.edit(this.id, options);
	}
}
