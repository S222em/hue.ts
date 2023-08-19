import { ResourceManager } from './ResourceManager';
import { APIResourceType } from '../types/api';
import { Zone, ZoneCreateOptions, ZoneEditOptions } from '../structures/Zone';
import { createZonePostPayload, createZonePutPayload } from '../payloads/zonePayload';

/**
 * Manages the zone resource
 */
export class ZoneManager extends ResourceManager<Zone> {
	type = APIResourceType.Zone;
	holds = Zone;

	/**
	 * Creates a new zone
	 * @param options
	 * @example
	 * ```
	 * await hue.zones.create({
	 *    name: 'Attic',
	 *    archeType: ArcheType.Attic,
	 *    children: ['some-lightId-1', 'some-lightId-2'],
	 * });
	 * ```
	 */
	public async create(options: ZoneCreateOptions): Promise<string> {
		return await this._post(createZonePostPayload(options));
	}

	/**
	 * Edits specified zone
	 * @param id
	 * @param options
	 * @example
	 * ```ts
	 * await hue.zones.edit('some-id', {
	 *    name: 'New name',
	 * });
	 * ```
	 */
	public async edit(id: string, options: ZoneEditOptions): Promise<string> {
		return await this._put(id, createZonePutPayload(options));
	}

	/**
	 * Deletes specified zone
	 * @param id
	 */
	public async delete(id: string): Promise<string> {
		return await this._delete(id);
	}
}
