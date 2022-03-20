import type { Group } from './Group';
import type { TransitionOptions } from '../types/common';
import { Routes } from '../util/Routes';
import type { Bridge } from '../bridge/Bridge';
import { SceneActionManager } from '../managers/SceneActionManager';
import { NamedResource } from './NamedResource';
import { SceneOptions, sceneTransformer } from '../transformers/SceneTransformer';
import { ApiScene } from '../types/api/scene';
import { ApiResourceType } from '../types/api/common';

export type SceneResolvable = Scene | string;

export interface SceneApplyOptions extends TransitionOptions {
	brightness?: number;
}

export class Scene extends NamedResource<ApiScene> {
	type = ApiResourceType.Scene;
	public readonly actions: SceneActionManager;

	constructor(bridge: Bridge) {
		super(bridge);
		this.actions = new SceneActionManager(this);
	}

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

	public async edit(options: SceneOptions) {
		await this._edit(sceneTransformer(this, options));
	}

	public async fetch(): Promise<Scene> {
		await this.bridge.scenes.fetch(this.id);
		return this;
	}

	protected async _edit(data: ApiScene) {
		await this.bridge.rest.put(Routes.scene(this.id), data);
	}
}
