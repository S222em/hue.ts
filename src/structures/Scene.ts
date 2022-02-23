import { NamedResource } from './NamedResource';
import { ResourceType } from './Resource';
import { ApiScene } from '../api';
import type { Group } from './Group';
import { SceneActionManager } from '../managers/SceneActionManager';
import type { TransitionOptions } from '../types/common';

export type SceneResolvable = Scene | string;

export class Scene extends NamedResource {
	type = ResourceType.Scene;
	public groupId: string;
	public actions = new SceneActionManager(this);

	public _patch(data: ApiScene.Data) {
		super._patch(data);
		if ('group' in data) {
			if ('rid' in data.group) this.groupId = data.group.rid;
		}
		if ('actions' in data) {
			data.actions.forEach((action) => {
				this.actions._add(action);
			});
		}
	}

	get group(): Group {
		const find = (group: Group) => group.id === this.groupId;

		const room = this.bridge.rooms.cache.find(find);
		if (room) return room;

		const zone = this.bridge.zones.cache.find(find);
		if (zone) return zone;
	}

	public async apply(transitionOptions?: TransitionOptions) {
		for await (const action of this.actions.cache.values()) {
			await action.apply(transitionOptions);
		}
	}

	protected async _edit(data: ApiScene.Put) {
		await this.bridge.rest.put(ApiScene.route(this.id), data);
	}
}
