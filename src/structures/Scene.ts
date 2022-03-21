import type { Group } from './Group';
import type { TransitionOptions } from '../types/common';
import { Routes } from '../util/Routes';
import { SceneActionManager } from '../managers/SceneActionManager';
import { NamedResource } from './NamedResource';
import { SceneEditOptions, sceneEditTransformer } from '../transformers/SceneEditTransformer';
import { ApiScene } from '../types/api/scene';
import { ApiResourceType } from '../types/api/common';
import { SceneActionEditOptions } from '../transformers/SceneActionEditTransformer';

export type SceneResolvable = Scene | string;

export interface SceneApplyOptions extends TransitionOptions {
	brightness?: number;
}

export class Scene extends NamedResource<ApiScene> {
	type = ApiResourceType.Scene;
	public readonly actions = new SceneActionManager(this);

	get group(): Group {
		return this.bridge.rooms.cache.get(this.groupId) || this.bridge.zones.cache.get(this.groupId);
	}

	get groupId(): string {
		return this.data.group?.rid;
	}

	public _patch(data: ApiScene) {
		super._patch(data);
		for (const action of data.actions || []) {
			this.actions._add(action);
		}
	}

	public async apply(options?: SceneApplyOptions) {
		await this._edit({
			recall: {
				action: 'active',
				duration: options?.duration,
				dimming: { brightness: options?.brightness },
			},
		});
	}

	public async edit(options: SceneEditOptions) {
		await this._edit(sceneEditTransformer(options, this));
	}

	public async setName(name: string) {
		return await this.edit({ name });
	}

	public async setActions(actions: SceneActionEditOptions[]) {
		return await this.edit({ actions });
	}

	public async fetch(): Promise<Scene> {
		await this.bridge.scenes.fetch(this.id);
		return this;
	}

	protected async _edit(data: ApiScene) {
		await this.bridge.rest.put(Routes.scene(this.id), data);
	}
}
