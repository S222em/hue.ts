import { ResourceType } from './Resource';
import type { Group } from './Group';
import type { DeepPartial, TransitionOptions } from '../types/common';
import type { ApiScene } from '../types/api';
import { Routes } from '../util/Routes';
import type { SceneActionOptions } from './SceneAction';
import type { Bridge } from '../bridge/Bridge';
import { SceneActionManager } from '../managers/SceneActionManager';
import { Util } from '../util/Util';
import { NamedResource } from './NamedResource';

export type SceneResolvable = Scene | string;

export interface SceneOptions {
	name?: string;
	actions?: SceneActionOptions[];
}

export interface SceneApplyOptions extends TransitionOptions {
	brightness?: number;
}

export class Scene extends NamedResource<ApiScene> {
	type = ResourceType.Scene;
	public readonly actions: SceneActionManager;

	constructor(bridge: Bridge) {
		super(bridge);
		this.actions = new SceneActionManager(this);
	}

	public _patch(data: ApiScene) {
		super._patch(data);
		for (const action of data.actions || []) {
			this.actions._add(action);
		}
	}

	get group(): Group {
		return this.bridge.rooms.cache.get(this.groupId) || this.bridge.zones.cache.get(this.groupId);
	}

	get groupId(): string {
		return this.data.group?.rid;
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
		await this._edit(Util.parseSceneOptions(options, this.bridge));
	}

	protected async _edit(data: DeepPartial<ApiScene>) {
		await this.bridge.rest.put(Routes.scene(this.id), data);
	}
}
