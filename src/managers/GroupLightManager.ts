import { Manager } from './Manager';
import type { Group } from '../structures/Group';
import type Collection from '@discordjs/collection';
import type { Light, LightResolvable } from '../structures/Light';

export class GroupLightManager extends Manager<LightResolvable> {
	public readonly group: Group;

	constructor(group: Group) {
		super();
		this.group = group;
	}

	get cache(): Collection<string, Light> {
		return this.group.bridge.lights.cache.filter((light) =>
			this.group.data.services.map((service) => service.rid).includes(light.id),
		);
	}
}
