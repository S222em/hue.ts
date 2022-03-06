import { Group } from './Group';
import { ResourceType } from './Resource';
import type { ApiZone } from '../types/api';
import { Routes } from '../util/Routes';

export type ZoneResolvable = Zone | string;

/**
 * Represents a hue zone
 */
export class Zone extends Group {
	type = ResourceType.Zone;

	protected async _edit(data: ApiZone): Promise<void> {
		await this.bridge.zones.rest.put(Routes.zone(this.id), data);
	}
}
