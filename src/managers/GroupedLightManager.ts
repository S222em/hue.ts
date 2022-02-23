import type { Bridge } from '../bridge/Bridge';
import { Light } from '../structures/Light';
import { GroupedLight, GroupedLightResolvable } from '../structures/GroupedLight';
import { ResourceManager } from './ResourceManager';
import type { ApiGroupedLight } from '../types/api';
import { Routes } from '../util/Routes';

export class GroupedLightManager extends ResourceManager<GroupedLight> {
	public constructor(bridge: Bridge) {
		super(bridge, { maxRequests: 1, perMilliseconds: 1000 });
	}

	public _add(data: ApiGroupedLight): GroupedLight {
		const groupedLight = this.cache.ensure(data.id, () => {
			return new GroupedLight(this.bridge);
		});
		groupedLight._patch(data);

		return groupedLight;
	}

	public resolve(resolvable: GroupedLightResolvable): GroupedLight {
		if (typeof resolvable === 'string') {
			if (this.cache.has(resolvable)) return this.cache.get(resolvable);
		} else if (resolvable instanceof Light) {
			return this.cache.get(resolvable.id);
		}
	}

	public async sync(): Promise<boolean | void> {
		const response = await this.rest.get(Routes.groupedLight());
		const data = response.data.data as ApiGroupedLight[];
		data.forEach((data) => {
			this._add(data);
		});
	}
}
