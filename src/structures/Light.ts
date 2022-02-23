import type { TemperatureLight } from './TemperatureLight';
import type { ColorLight } from './ColorLight';
import type { DimmableLight } from './DimmableLight';
import type { GradientLight } from './GradientLight';
import { ResourceType } from './Resource';
import { NamedResource } from './NamedResource';
import type { SceneResolvable } from './Scene';
import { LightCapabilities } from './LightCapabilities';
import type { DeepPartial, TransitionOptions } from '../types/common';
import { LightGroupManager } from '../managers/LightGroupManager';
import type { ApiLight } from '../types/api';
import { Routes } from '../util/Routes';

export type LightResolvable = Light | string;

export interface LightStateOptions {
	on?: boolean;
}

export class Light extends NamedResource {
	type = ResourceType.Light;
	public capabilities = new LightCapabilities();
	public groups = new LightGroupManager(this);
	public on: boolean;

	public _patch(data: ApiLight): void {
		super._patch(data);
		this.capabilities._patch(data);
		if ('on' in data) this.on = data.on.on;
	}

	public async state(state: LightStateOptions, transition: TransitionOptions): Promise<void> {
		await this._edit({ on: { on: state.on ?? true } }, transition);
	}

	public async applyScene(resolvable: SceneResolvable, transitionOptions?: TransitionOptions): Promise<void> {
		const scene = this.bridge.scenes.resolve(resolvable);
		await scene.actions.cache.get(this.id)?.apply(transitionOptions);
	}

	public isDimmable(): this is DimmableLight | TemperatureLight | ColorLight | GradientLight {
		return Boolean(
			[
				ResourceType.DimmableLight,
				ResourceType.TemperatureLight,
				ResourceType.ColorLight,
				ResourceType.GradientLight,
			].includes(this.type),
		);
	}

	public isTemperature(): this is TemperatureLight | ColorLight | GradientLight {
		return Boolean(
			[ResourceType.TemperatureLight, ResourceType.ColorLight, ResourceType.GradientLight].includes(this.type),
		);
	}

	public isColor(): this is ColorLight | GradientLight {
		return Boolean([ResourceType.ColorLight, ResourceType.GradientLight].includes(this.type));
	}

	public isGradient(): this is GradientLight {
		return Boolean(this.type === ResourceType.GradientLight);
	}

	protected async _edit(data: DeepPartial<ApiLight>, transition: TransitionOptions): Promise<void> {
		await this.bridge.lights.rest.put(Routes.light(this.id), {
			...data,
			dynamics: { duration: transition.duration },
		});
	}
}
