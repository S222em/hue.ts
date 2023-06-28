import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { Geolocation, GeolocationEditOptions } from '../structures/Geolocation';

/**
 * Manages the geolocation resource
 */
export class GeolocationManager extends Manager<ResourceType.Geolocation> {
	type = ResourceType.Geolocation;
	holds = Geolocation;

	/**
	 * Edits specified geolocation
	 * @param id ID of the geolocation
	 * @param options Options for editing the geolocation
	 * @example
	 * ```
	 * await hue.geolocations.edit('some-id', {
	 *    latitude: 50,
	 *    longitude: 60,
	 * });
	 * ```
	 */
	public async edit(id: string, options: GeolocationEditOptions): Promise<void> {
		await this._put(id, {
			latitude: options.latitude,
			longitude: options.longitude,
		});
	}
}
