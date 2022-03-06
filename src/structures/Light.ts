import type { TemperatureLight } from './TemperatureLight';
import type { ColorLight } from './ColorLight';
import type { DimmableLight } from './DimmableLight';
import type { GradientLight } from './GradientLight';
import { Resource, ResourceType } from './Resource';
import { LightCapabilities } from './LightCapabilities';
import type { DeepPartial, TransitionOptions } from '../types/common';
import { LightZoneManager } from '../managers/LightZoneManager';
import type { ApiLight } from '../types/api';
import { Routes } from '../util/Routes';
import type { Room } from './Room';
import type { Bridge } from '../bridge/Bridge';
import { Util } from '../util/Util';

export type LightResolvable = Light | string;

export interface LightStateOptions {
	on?: boolean;
}

/**
 * Represents a hue light
 */
export class Light extends Resource<ApiLight> {
	type = ResourceType.Light;
	/**
	 * The capabilities of this light
	 */
	public capabilities: LightCapabilities;
	/**
	 * A manager with all the zones this light belongs too
	 */
	public zones: LightZoneManager;

	constructor(bridge: Bridge) {
		super(bridge);
		this.capabilities = new LightCapabilities(this);
		this.zones = new LightZoneManager(this);
	}

	get id(): string {
		return this.data.id;
	}

	get name(): string {
		return this.data.metadata?.name;
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

	get on(): boolean {
		return this.data.on?.on;
	}

	/**
	 * Edits the state of the Light
	 */
	public async state(state: LightStateOptions, transition?: TransitionOptions): Promise<void> {
		await this._edit(Util.parseLightStateOptions(state, this), transition);
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

	protected async _edit(data: DeepPartial<ApiLight>, transition?: TransitionOptions): Promise<void> {
		console.log(data);
		await this.bridge.lights.rest.put(Routes.light(this.id), {
			...data,
			dynamics: { duration: transition?.duration },
		});
	}
}
