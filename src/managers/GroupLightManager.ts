import type Collection from '@discordjs/collection';
import { GroupResourceManager } from './GroupResourceManager';
import type { Light } from '../structures/Light';

export class GroupLightManager extends GroupResourceManager {
	/**
	 * The cache of this manager
	 */
	get cache(): Collection<string, Light> {
		return this.group.bridge.lights.cache.filter((light) => this.group.lightIds.includes(light.id));
	}
}
