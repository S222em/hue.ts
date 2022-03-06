import type { GroupedLight } from './GroupedLight';
import type { SceneApplyOptions, SceneResolvable } from './Scene';
import { GroupSceneManager } from '../managers/GroupSceneManager';
import { GroupLightManager } from '../managers/GroupLightManager';
import type { DeepPartial, TransitionOptions } from '../types/common';
import type { ApiGroup } from '../types/api';
import { Resource } from './Resource';
import type { Bridge } from '../bridge/Bridge';

export type GroupResolvable = Group | 'string';

export interface GroupStateOptions {
	on?: boolean;
	brightness?: number;
	temperature?: number;
	color?: string;
	gradient?: string[];
}

export abstract class Group extends Resource<ApiGroup> {
	public readonly scenes: GroupSceneManager;
	public readonly lights: GroupLightManager;

	constructor(bridge: Bridge) {
		super(bridge);
		this.scenes = new GroupSceneManager(this);
		this.lights = new GroupLightManager(this);
	}

	get id(): string {
		return this.data.id;
	}

	get name(): string {
		return this.data.metadata?.name;
	}

	get groupedLight(): GroupedLight {
		return this.bridge.groupedLights.cache.get(this.groupedLightId);
	}

	get groupedLightId(): string {
		return this.data.services.find((service) => service.rtype === 'grouped_light')?.rid;
	}

	get on(): boolean {
		return this.groupedLight.on;
	}

	public async state(state: GroupStateOptions, transitionOptions?: TransitionOptions) {
		for await (const light of this.lights.cache.values()) {
			await light.state(state, transitionOptions);
		}
	}

	public async applyScene(resolvable: SceneResolvable, options?: SceneApplyOptions) {
		const scene = this.bridge.scenes.resolve(resolvable);
		await scene?.apply(options);
	}

	protected abstract _edit(data: DeepPartial<ApiGroup>): Promise<void>;
}
