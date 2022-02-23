import { LightResourceManager } from './LightResourceManager';
import type Collection from '@discordjs/collection';
import type { Zone } from '../structures/Zone';

export class LightZoneManager extends LightResourceManager {
	/**
	 * The cache of this manager
	 */
	get cache(): Collection<string, Zone> {
		return this.light.bridge.zones.cache.filter((zone) => zone.lights.cache.has(this.light.id));
	}
}
