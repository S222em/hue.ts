import type { TemperatureLight } from './TemperatureLight';
import type { ColorLight } from './ColorLight';
import type { DimmableLight } from './DimmableLight';
import type { GradientLight } from './GradientLight';
import { ResourceType } from './Resource';
import { NamedResource } from './NamedResource';
import type { SceneResolvable } from './Scene';
import { LightCapabilities } from './LightCapabilities';
import type { DeepPartial, TransitionOptions } from '../types/common';
import { LightZoneManager } from '../managers/LightZoneManager';
import type { ApiLight } from '../types/api';
import { Routes } from '../util/Routes';
import type { Room } from './Room';

export type LightResolvable = Light | string;

export interface LightStateOptions {
	on?: boolean;
}

/**
 * Represents a hue light
 */
export class Light extends NamedResource {
	type = ResourceType.Light;
	/**
	 * The capabilities of this light
	 */
	public capabilities = new LightCapabilities();
	/**
	 * A manager with all the zones this light belongs too
	 */
	public zones = new LightZoneManager(this);
	/**
	 * The current on state of this light
	 */
	public on: boolean;

	/**
	 * Patches the resource with received data
	 * @internal
	 */
	public _patch(data: ApiLight): void {
		super._patch(data);
		this.capabilities._patch(data);
		if ('on' in data) this.on = data.on.on;
	}

	/**
	 * The room this light belongs to
	 */
	get room(): Room {
		return this.bridge.rooms.cache.find((room) => room.lights.cache.has(this.id));
	}

	/**
	 * The id of the Room this light belongs to
	 */
	get roomId(): string {
		return this.room?.id;
	}

	/**
	 * Edits the state of the Light
	 */
	public async state(state: LightStateOptions, transition: TransitionOptions): Promise<void> {
		await this._edit({ on: { on: state.on ?? true } }, transition);
	}

	/**
	 * Applies a scene to this Light
	 */
	public async applyScene(resolvable: SceneResolvable, transitionOptions?: TransitionOptions): Promise<void> {
		const scene = this.bridge.scenes.resolve(resolvable);
		await scene.actions.cache.get(this.id)?.apply(transitionOptions);
	}

	/**
	 * Whether this light is capable of dimming
	 */
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

	/**
	 * Whether this light is capable of displaying temperatures
	 */
	public isTemperature(): this is TemperatureLight | ColorLight | GradientLight {
		return Boolean(
			[ResourceType.TemperatureLight, ResourceType.ColorLight, ResourceType.GradientLight].includes(this.type),
		);
	}

	/**
	 * Whether this light is capable of displaying colors
	 */
	public isColor(): this is ColorLight | GradientLight {
		return Boolean([ResourceType.ColorLight, ResourceType.GradientLight].includes(this.type));
	}

	/**
	 * Whether this light is capable of gradient
	 */
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
