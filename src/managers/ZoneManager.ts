import type { Bridge } from '../bridge/Bridge';
import { ApiZone } from '../api';
import type { GroupResolvable } from '../structures/Group';
import { Zone } from '../structures/Zone';
import { ResourceManager } from './ResourceManager';

export class ZoneManager extends ResourceManager<Zone> {
	public constructor(bridge: Bridge) {
		super(bridge, { maxRequests: 1, perMilliseconds: 1000 });
	}

	public _add(data: ApiZone.Data): Zone {
		const zone = this.cache.ensure(data.id, () => {
			return new Zone(this.bridge);
		});
		zone._patch(data);

		return zone;
	}

	public resolve(resolvable: GroupResolvable): Zone {
		if (typeof resolvable === 'string') {
			if (this.cache.has(resolvable)) return this.cache.get(resolvable);
			const find = this.cache.find((zone) => zone.name === resolvable);
			if (find) return find;
		} else if (resolvable instanceof Zone) {
			return this.cache.get(resolvable.id);
		}
	}

	public async sync(): Promise<boolean | void> {
		const response = await this.rest.get(ApiZone.route());
		const data = response.data.data as ApiZone.Get;
		data.forEach((data) => {
			this._add(data);
		});
	}
}
