import type { Bridge } from '../bridge/Bridge';
import { Zone } from '../structures/Zone';
import { ResourceManager } from './ResourceManager';
import { Routes } from '../util/Routes';
import Collection from '@discordjs/collection';
import { ApiZone, ApiZoneGet } from '../types/api/zone';

/**
 * Manager for all Hue zones
 */
export class ZoneManager extends ResourceManager<Zone> {
	/**
	 * The cache of this manager
	 */
	public readonly cache: Collection<string, Zone>;

	public constructor(bridge: Bridge) {
		super(bridge);
		this.cache = new Collection();
	}

	/**
	 * Adds or updates a zone in the cache
	 * @param data
	 */
	public _add(data: ApiZone): Zone {
		const zone = this.cache.ensure(data.id, () => new Zone(this.bridge));
		zone._patch(data);
		return zone;
	}

	/**
	 * Fetches a specific zone from the bridge
	 * @param id
	 * @internal
	 */
	public async fetch(id?: string): Promise<boolean | void> {
		const response = await this.bridge.rest.get(Routes.zone(id));
		const data = response.data as ApiZoneGet;
		data.data.forEach((data: ApiZone) => {
			this._add(data);
		});
	}
}
