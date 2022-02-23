import { NamedResource } from './NamedResource';
import type { GroupedLight } from './GroupedLight';
import type { SceneResolvable } from './Scene';
import { GroupSceneManager } from '../managers/GroupSceneManager';
import { GroupLightManager } from '../managers/GroupLightManager';
import type { DeepPartial, TransitionOptions } from '../types/common';
import type { ApiGroup } from '../types/api';

export type GroupResolvable = Group | 'string';

export interface GroupStateOptions {
	on?: boolean;
	brightness?: number;
	temperature?: number;
	color?: string;
	gradient?: string[];
}

/**
 * Represents a hue room/zone
 */
export abstract class Group extends NamedResource {
	/**
	 * A manager with all the scenes that belong to this Group
	 */
	public scenes: GroupSceneManager = new GroupSceneManager(this);
	/**
	 * A manager with all the lights that belong to this Group
	 */
	public lights: GroupLightManager = new GroupLightManager(this);
	protected _lightIds: Array<string>;
	protected _groupedLightId: string;

	/**
	 * Patches the resource with received data
	 * @internal
	 */
	public _patch(data: ApiGroup) {
		super._patch(data);
		if ('services' in data) {
			this._lightIds = data.services.filter((service) => service.rtype === 'light').map((service) => service.rid);
			this._groupedLightId = data.services.find((service) => service.rtype === 'grouped_light')?.rid;
		}
	}

	/**
	 * The groupedLight belonging to this Group
	 */
	get groupedLight(): GroupedLight {
		return this.bridge.groupedLights.cache.get(this._groupedLightId);
	}

	/**
	 * The current on state of the Group
	 */
	get on(): boolean {
		return this.groupedLight.on;
	}

	/**
	 * Edits the state of the Group
	 */
	public async state(state: GroupStateOptions, transitionOptions: TransitionOptions) {
		for await (const light of this.lights.cache.values()) {
			await light.state(state, transitionOptions);
		}
	}

	/**
	 * Applies a scene to this group
	 */
	public async applyScene(resolvable: SceneResolvable, transitionOptions: TransitionOptions) {
		const scene = this.bridge.scenes.resolve(resolvable);
		if (!this.scenes.cache.has(scene.id)) return;
		await scene?.apply(transitionOptions);
	}

	protected abstract _edit(data: DeepPartial<ApiGroup>): Promise<void>;
}
