import type { Bridge } from '../bridge/Bridge';
import { GroupedLight } from '../structures/GroupedLight';
import { ResourceManager } from './ResourceManager';
import { Routes } from '../util/Routes';
import Collection from '@discordjs/collection';
import { ApiGroupedLight, ApiGroupedLightGet } from '../types/api/grouped_light';

/**
 * Manager for all Hue grouped lights
 */
export class GroupedLightManager extends ResourceManager<GroupedLight> {
	/**
	 * The cache of this manager
	 */
	public readonly cache: Collection<string, GroupedLight>;

	public constructor(bridge: Bridge) {
		super(bridge);
		this.cache = new Collection();
	}

	/**
	 * Adds or updates a grouped lights in the cache
	 * @param data
	 * @internal
	 */
	public _add(data: ApiGroupedLight): GroupedLight {
		const groupedLight = this.cache.ensure(data.id, () => new GroupedLight(this.bridge));
		groupedLight._patch(data);
		return groupedLight;
	}

	/**
	 * Fetches a specific grouped light from the bridge
	 * @param id
	 */
	public async fetch(id?: string): Promise<boolean | void> {
		const response = await this.bridge.rest.get(Routes.groupedLight(id));
		const data = response.data as ApiGroupedLightGet;
		data.data.forEach((data: ApiGroupedLight) => {
			this._add(data);
		});
	}
}
