import type { Bridge } from '../bridge/Bridge';
import { Zone, ZoneResolvable } from '../structures/Zone';
import { ResourceManager } from './ResourceManager';
import type { ApiZone } from '../types/api';
import { Routes } from '../util/Routes';
import Collection from '@discordjs/collection';

export class ZoneManager extends ResourceManager<ZoneResolvable> {
	public readonly cache: Collection<string, Zone>;

	public constructor(bridge: Bridge) {
		super(bridge, { maxRequests: 1, perMilliseconds: 1000 });
		this.cache = new Collection();
	}

	/**
	 * Patches/creates a Zone
	 * @internal
	 */
	public _add(data: ApiZone): Zone {
		const zone = this.cache.ensure(data.id, () => new Zone(this.bridge));
		zone._patch(data);
		return zone;
	}

	/**
	 * Syncs all the Zones of the bridge with this manager
	 */
	public async sync(): Promise<boolean | void> {
		const response = await this.rest.get(Routes.zone());
		const data = response.data.data as ApiZone[];
		data.forEach((data) => {
			this._add(data);
		});
	}
}
