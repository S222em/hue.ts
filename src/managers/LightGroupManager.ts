import type { Group } from '../structures/Group';
import { LightResourceManager } from './LightResourceManager';
import Collection from '@discordjs/collection';

export class LightGroupManager extends LightResourceManager {
	/**
	 * The cache of this manager
	 */
	get cache(): Collection<string, Group> {
		const rooms = this.light.bridge.rooms.cache.filter((room) => room.lights.cache.has(this.light.id));
		const zones = this.light.bridge.zones.cache.filter((zone) => zone.lights.cache.has(this.light.id));

		return new Collection<string, Group>().concat(rooms, zones);
	}
}
