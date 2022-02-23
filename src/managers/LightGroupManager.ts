import type { Group } from '../structures/Group';
import { LightResourceManager } from './LightResourceManager';
import Collection from '@discordjs/collection';

export class LightGroupManager extends LightResourceManager {
	get cache(): Collection<string, Group> {
		const rooms = this.light.bridge.rooms.cache.filter((room) => room.lightIds.includes(this.light.id));
		const zones = this.light.bridge.zones.cache.filter((zone) => zone.lightIds.includes(this.light.id));

		return new Collection<string, Group>().concat(rooms, zones);
	}
}
