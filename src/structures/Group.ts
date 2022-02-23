import type { ApiRoom } from '../api';
import { NamedResource } from './NamedResource';
import type { GroupedLight } from './GroupedLight';
import type { SceneResolvable } from './Scene';
import { GroupSceneManager } from '../managers/GroupSceneManager';
import { GroupLightManager } from '../managers/GroupLightManager';
import type { TransitionOptions } from '../types/common';

export type GroupResolvable = Group | 'string';

export interface GroupStateOptions {
	on?: boolean;
	brightness?: number;
	temperature?: number;
	color?: string;
	gradient?: string[];
}

export abstract class Group extends NamedResource {
	public lightIds: Array<string>;
	public scenes: GroupSceneManager = new GroupSceneManager(this);
	public lights: GroupLightManager = new GroupLightManager(this);
	protected _groupedLightId: string;

	public _patch(data: ApiRoom.Data) {
		super._patch(data);
		if ('services' in data) {
			this.lightIds = data.services.filter((service) => service.rtype === 'light').map((service) => service.rid);
			this._groupedLightId = data.services.find((service) => service.rtype === 'grouped_light')?.rid;
		}
	}

	get groupedLight(): GroupedLight {
		return this.bridge.groupedLights.cache.get(this._groupedLightId);
	}

	get on(): boolean {
		return this.groupedLight.on;
	}

	public async state(state: GroupStateOptions, transitionOptions: TransitionOptions) {
		for await (const light of this.lights.cache.values()) {
			await light.state(state, transitionOptions);
		}
	}

	public async applyScene(resolvable: SceneResolvable, transitionOptions: TransitionOptions) {
		const scene = this.bridge.scenes.resolve(resolvable);
		if (!this.scenes.cache.has(scene.id)) return;
		await scene?.apply(transitionOptions);
	}

	protected abstract _edit(data: ApiRoom.Put): Promise<void>;
}
