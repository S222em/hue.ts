import { Group } from './Group';
import { Routes } from '../util/Routes';
import { ApiZone } from '../types/api/zone';
import { ApiResourceType } from '../types/api/common';
import Collection from '@discordjs/collection';
import { Light } from './Light';

export type ZoneResolvable = Zone | string;

export class Zone extends Group<ApiZone> {
	type = ApiResourceType.Zone;

	get lights(): Collection<string, Light> {
		return this.bridge.lights.cache.filter((light) =>
			this.data.children.some((child) => child.rid === light.id && child.rtype === ApiResourceType.Light),
		);
	}

	public async fetch(): Promise<Zone> {
		await this.bridge.zones.fetch(this.id);
		return this;
	}

	protected async _edit(data: ApiZone): Promise<void> {
		await this.bridge.rest.put(Routes.zone(this.id), data);
	}
}
