import type { Group } from './Group';
import type { TransitionOptions } from '../types/common';
import { Routes } from '../util/Routes';
import { SceneActionManager } from '../managers/SceneActionManager';
import { NamedResource } from './NamedResource';
import { ApiScene } from '../types/api/scene';
import { ApiResourceType } from '../types/api/common';
import { Bridge } from '../bridge/Bridge';
import { SceneAction, SceneActionOptions } from './SceneAction';

export type SceneResolvable = Scene | string;

export interface SceneApplyOptions extends TransitionOptions {
	brightness?: number;
}

export interface SceneOptions {
	name?: string;
	actions?: SceneActionOptions[];
}

/**
 * Represents a Hue scene
 */
export class Scene extends NamedResource<ApiScene> {
	type = ApiResourceType.Scene;
	/**
	 * The actions to perform when the scene is activated
	 */
	public readonly actions = new SceneActionManager(this);

	/**
	 * The connected group
	 */
	get group(): Group {
		return this.bridge.rooms.cache.get(this.groupId) || this.bridge.zones.cache.get(this.groupId);
	}

	/**
	 * The connected group ID
	 */
	get groupId(): string {
		return this.data.group?.rid;
	}

	/**
	 * Patches this Scene with new data received from the API
	 * @param data Data to patch
	 * @internal
	 */
	public _patch(data: ApiScene) {
		super._patch(data);
		for (const action of data.actions || []) {
			this.actions._add(action);
		}
	}

	/**
	 * Applies this scene to the connected group
	 * @param options
	 */
	public async apply(options?: SceneApplyOptions) {
		await this._edit({
			recall: {
				action: 'active',
				duration: options?.duration,
				dimming: { brightness: options?.brightness },
			},
		});
	}

	/**
	 * Edits this scene e.g. new name
	 * @param options
	 */
	public async edit(options: SceneOptions) {
		await this._edit(Scene.transform(this.bridge, options));
	}

	/**
	 * Edits the actions for this scenes activation
	 * @param actions
	 */
	public async setActions(actions: SceneActionOptions[]) {
		return await this.edit({ actions });
	}

	/**
	 * Deletes this scene
	 */
	public async delete() {
		await this.bridge.rest.delete(Routes.scene.id(this.id));
	}

	/**
	 * Fetches this Scene from the Bridge
	 */
	public async fetch(): Promise<Scene> {
		await this.bridge.scenes.fetch(this.id);
		return this;
	}

	/**
	 * Edits this scene with raw API data structure
	 * @param data
	 * @protected
	 * @internal
	 */
	protected async _edit(data: ApiScene) {
		await this.bridge.rest.put(Routes.scene.id(this.id), data);
	}

	public static transform(bridge: Bridge, options: SceneOptions): ApiScene {
		return {
			metadata: options.name ? { name: options.name } : undefined,
			actions: options.actions ? options.actions.map((action) => SceneAction.transform(bridge, action)) : undefined,
		};
	}
}
