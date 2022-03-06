import type { Bridge } from '../bridge/Bridge';
import { GroupedLight, GroupedLightResolvable } from '../structures/GroupedLight';
import { ResourceManager } from './ResourceManager';
import type { ApiGroupedLight } from '../types/api';
import { Routes } from '../util/Routes';
import Collection from '@discordjs/collection';

export class GroupedLightManager extends ResourceManager<GroupedLightResolvable> {
	public readonly cache: Collection<string, GroupedLight>;

	public constructor(bridge: Bridge) {
		super(bridge, { maxRequests: 1, perMilliseconds: 1000 });
		this.cache = new Collection();
	}

	/**
	 * Patches/creates a Grouped Light
	 * @internal
	 */
	public _add(data: ApiGroupedLight): GroupedLight {
		const groupedLight = this.cache.ensure(data.id, () => new GroupedLight(this.bridge));
		groupedLight._patch(data);
		return groupedLight;
	}

	/**
	 * Syncs all the Grouped Lights of the bridge with this manager
	 */
	public async sync(): Promise<boolean | void> {
		const response = await this.rest.get(Routes.groupedLight());
		const data = response.data.data as ApiGroupedLight[];
		data.forEach((data) => {
			this._add(data);
		});
	}
}
