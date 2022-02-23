import type Collection from '@discordjs/collection';
import type { Scene } from '../structures/Scene';
import { GroupResourceManager } from './GroupResourceManager';

export class GroupSceneManager extends GroupResourceManager {
	/**
	 * The cache of this manager
	 */
	get cache(): Collection<string, Scene> {
		return this.group.bridge.scenes.cache.filter((scene) => scene.group?.id === this.group.id);
	}
}
