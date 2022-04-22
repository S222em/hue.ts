import type { Group } from './Group';
import type { TransitionOptions } from '../types/common';
import { Routes } from '../routes/Routes';
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
	public async edit(options: SceneEditOptions) {
		await this._edit(sceneEditTransformer(options, this));
	}

	/**
	 * Edits the actions for this scenes activation
	 * @param actions
	 */
	public async setActions(actions: SceneActionEditOptions[]) {
		return await this.edit({ actions });
	}

	/**
	 * Deletes this scene
	 */
	public async delete() {
		await this.bridge.rest.delete(Routes.Scene.addId(this.id));
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
		await this.bridge.rest.put(Routes.Scene.addId(this.id), data);
	}
}
