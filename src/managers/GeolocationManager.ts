import { Manager } from './Manager';
import { APIResourceType } from '../api/ResourceType';
import { Geolocation, GeolocationEditOptions } from '../structures/Geolocation';
import { createGeolocationPutPayload } from '../payloads/geolocationPayload';

/**
 * Manages the geolocation resource
 */
export class GeolocationManager extends Manager<APIResourceType.Geolocation> {
	type = APIResourceType.Geolocation;
	holds = Geolocation;

	/**
	 * Edits specified geolocation
	 * @param id
	 * @param options
	 * @example
	 * ```
	 * await hue.geolocations.edit('some-id', {
	 *    latitude: 50,
	 *    longitude: 60,
	 * });
	 * ```
	 */
	public async edit(id: string, options: GeolocationEditOptions): Promise<string> {
		return await this._put(id, createGeolocationPutPayload(options));
	}
}
