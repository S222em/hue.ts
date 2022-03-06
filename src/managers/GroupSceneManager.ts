import { Manager } from './Manager';
import type { Scene, SceneResolvable } from '../structures/Scene';
import type { Group } from '../structures/Group';
import type Collection from '@discordjs/collection';

export class GroupSceneManager extends Manager<SceneResolvable> {
	public readonly group: Group;

	constructor(group: Group) {
		super();
		this.group = group;
	}

	get cache(): Collection<string, Scene> {
		return this.group.bridge.scenes.cache.filter((scene) => scene.groupId === this.group.id);
	}
}
