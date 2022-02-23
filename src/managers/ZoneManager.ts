import type { Bridge } from '../bridge/Bridge';
import type { GroupResolvable } from '../structures/Group';
import { Zone } from '../structures/Zone';
import { ResourceManager } from './ResourceManager';
import type { ApiZone } from '../types/api';
import { Routes } from '../util/Routes';

export class ZoneManager extends ResourceManager<Zone> {
	public constructor(bridge: Bridge) {
		super(bridge, { maxRequests: 1, perMilliseconds: 1000 });
	}

	/**
	 * Patches/creates a Zone
	 * @internal
	 */
	public _add(data: ApiZone): Zone {
		const zone = this.cache.ensure(data.id, () => {
			return new Zone(this.bridge);
		});
		zone._patch(data);

		return zone;
	}

	/**
	 * Resolves a Zone resolvable
	 */
	public resolve(resolvable: GroupResolvable): Zone {
		if (typeof resolvable === 'string') {
			if (this.cache.has(resolvable)) return this.cache.get(resolvable);
			const find = this.cache.find((zone) => zone.name === resolvable);
			if (find) return find;
		} else if (resolvable instanceof Zone) {
			return this.cache.get(resolvable.id);
		}
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
