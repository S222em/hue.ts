import type { GroupedLight } from './GroupedLight';
import type { SceneApplyOptions, SceneResolvable } from './Scene';
import { GroupSceneManager } from '../managers/GroupSceneManager';
import { GroupLightManager } from '../managers/GroupLightManager';
import type { TransitionOptions } from '../types/common';
import type { Bridge } from '../bridge/Bridge';
import { NamedResource } from './NamedResource';
import { ApiRoom } from '../types/api/room';
import { ApiZone } from '../types/api/zone';

export type GroupResolvable = Group | 'string';

export interface GroupStateOptions {
	on?: boolean;
	brightness?: number;
	temperature?: number;
	color?: string;
	gradient?: string[];
}

export abstract class Group<R extends ApiRoom | ApiZone = ApiRoom | ApiZone> extends NamedResource<R> {
	public readonly scenes: GroupSceneManager;
	public readonly lights: GroupLightManager;

	constructor(bridge: Bridge) {
		super(bridge);
		this.scenes = new GroupSceneManager(this);
		this.lights = new GroupLightManager(this);
	}

	get groupedLight(): GroupedLight {
		return this.bridge.groupedLights.cache.get(this.groupedLightId);
	}

	get groupedLightId(): string {
		return this.data.services.find((service) => service.rtype === 'grouped_light')?.rid;
	}

	public async on(transitionOptions?: TransitionOptions): Promise<void> {
		await this.state({ on: true }, transitionOptions);
	}

	public async off(transitionOptions?: TransitionOptions): Promise<void> {
		await this.state({ on: false }, transitionOptions);
	}

	public async toggle(transitionOptions?: TransitionOptions): Promise<void> {
		await this.state({ on: !this.isOn() }, transitionOptions);
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

	public isOn(): boolean {
		return this.groupedLight.isOn();
	}

	protected abstract _edit(data: ApiRoom | ApiZone): Promise<void>;
}
