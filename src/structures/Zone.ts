import { Group } from './Group';
import { Routes } from '../util/Routes';
import { ApiZone } from '../types/api/zone';
import { ApiResourceType } from '../types/api/common';

export type ZoneResolvable = Zone | string;

export class Zone extends Group<ApiZone> {
	type = ApiResourceType.Zone;

	public async fetch(): Promise<Zone> {
		await this.bridge.zones.fetch(this.id);
		return this;
	}

	protected async _edit(data: ApiZone): Promise<void> {
		await this.bridge.rest.put(Routes.zone(this.id), data);
	}
}
