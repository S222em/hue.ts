import { Group } from './Group';
import { Routes } from '../util/Routes';
import { ApiZone } from '../types/api/zone';
import { ApiResourceType } from '../types/api/common';
import Collection from '@discordjs/collection';
import { Light } from './Light';

export type ZoneResolvable = Zone | string;

/**
 * Represents a Hue zone
 */
export class Zone extends Group<ApiZone> {
	type = ApiResourceType.Zone;

	/**
	 * The connected lights
	 */
	get lights(): Collection<string, Light> {
		return this.bridge.lights.cache.filter((light) =>
			this.data.children.some((child) => child.rid === light.id && child.rtype === ApiResourceType.Light),
		);
	}

	/**
	 * Deletes this zone
	 */
	public async delete(): Promise<void> {
		await this.bridge.rest.delete(Routes.zone(this.id));
	}

	/**
	 * Fetches this Zone from the Bridge
	 */
	public async fetch(): Promise<Zone> {
		await this.bridge.zones.fetch(this.id);
		return this;
	}

	/**
	 * Edits this zone with raw API data structure
	 * @param data
	 * @protected
	 * @internal
	 */
	protected async _edit(data: ApiZone): Promise<void> {
		await this.bridge.rest.put(Routes.zone(this.id), data);
	}
}
