import type { Bridge } from '../bridge/Bridge';
import { GroupedLight } from '../structures/GroupedLight';
import { ResourceManager } from './ResourceManager';
import { Routes } from '../util/Routes';
import { ApiGroupedLight } from '../types/api/grouped_light';

/**
 * Manager for all Hue grouped lights
 */
export class GroupedLightManager extends ResourceManager<GroupedLight, ApiGroupedLight> {
	public constructor(bridge: Bridge) {
		super(bridge, { createCollection: true, makeCache: () => new GroupedLight(bridge), route: Routes.groupedLight });
	}
}
