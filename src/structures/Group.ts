import type { GroupedLight } from './GroupedLight';
import type { SceneApplyOptions, SceneResolvable } from './Scene';
import { Scene } from './Scene';
import type { TransitionOptions } from '../types/common';
import { NamedResource } from './NamedResource';
import { ApiRoom } from '../types/api/room';
import { ApiZone } from '../types/api/zone';
import Collection from '@discordjs/collection';
import { Light, LightResolvable } from './Light';
import { GroupEditOptions, groupEditTransformer } from '../transformers/GroupEditTransformer';

export interface GroupStateOptions {
	on?: boolean;
	brightness?: number;
	temperature?: number;
	color?: string;
	gradient?: string[];
}

export abstract class Group<R extends ApiRoom | ApiZone = ApiRoom | ApiZone> extends NamedResource<R> {
	abstract lights: Collection<string, Light>;

	get groupedLight(): GroupedLight {
		return this.bridge.groupedLights.cache.get(this.groupedLightId);
	}

	get groupedLightId(): string {
		return this.data.services.find((service) => service.rtype === 'grouped_light')?.rid;
	}

	get scenes(): Collection<string, Scene> {
		return this.bridge.scenes.cache.filter((scene) => scene.data.group?.rid === this.id);
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
		for await (const light of this.lights.values()) {
			await light.state(state, transitionOptions);
		}
	}

	public async applyScene(resolvable: SceneResolvable, options?: SceneApplyOptions) {
		const scene = this.bridge.scenes.resolve(resolvable);
		await scene?.apply(options);
	}

	public async edit(options: GroupEditOptions): Promise<void> {
		return this._edit(groupEditTransformer(options, this));
	}

	public async addLight(resolvable: LightResolvable): Promise<void> {
		const light = this.bridge.lights.resolve(resolvable);
		return await this.edit({ lights: [...this.lights.values(), light] });
	}

	public async removeLight(resolvable: LightResolvable): Promise<void> {
		const light = this.bridge.lights.resolve(resolvable);
		return await this.edit({ lights: [...this.lights.filter((l) => l.id !== light.id).values()] });
	}

	public isOn(): boolean {
		return this.groupedLight.isOn();
	}

	protected abstract _edit(data: ApiRoom | ApiZone): Promise<void>;
}
