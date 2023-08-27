import { ResourceManager } from './ResourceManager';
import { APIResourceType } from '../types/api';
import { GeofenceClient, GeofenceCreateOptions, GeofenceEditOptions } from '../structures/GeofenceClient';
import { createGeofenceClientPostPayload, createGeofenceClientPutPayload } from '../payloads/geofenceClientPayload';

/**
 * Manages the geofence_client resource
 */
export class GeofenceClientManager extends ResourceManager<GeofenceClient> {
	type = APIResourceType.GeofenceClient;
	holds = GeofenceClient;

	/**
	 * Creates a new geofence client
	 * @param options
	 * @example
	 * ```
	 * await hue.geofenceClients.create({
	 *    name: 'Some awesome device name',
	 *    isAtHome: true,
	 * });
	 * ```
	 */
	public async create(options: GeofenceCreateOptions): Promise<string> {
		return await this._post(createGeofenceClientPostPayload(options));
	}

	/**
	 * Edits specified geofence client
	 * @param id
	 * @param options
	 * @example
	 * ```
	 * await hue.geofenceClients.create({
	 *    isAtHome: false,
	 * });
	 * ```
	 */
	public async edit(id: string, options: GeofenceEditOptions): Promise<string> {
		return await this._put(id, createGeofenceClientPutPayload(options));
	}

	/**
	 * Deletes specified geofence client
	 * @param id
	 */
	public async delete(id: string): Promise<string> {
		return await this._delete(id);
	}
}
