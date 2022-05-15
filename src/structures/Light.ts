import type { TemperatureLight } from './TemperatureLight';
import type { ColorLight } from './ColorLight';
import type { DimmableLight } from './DimmableLight';
import type { GradientLight } from './GradientLight';
import { LightCapabilities } from './LightCapabilities';
import type { TransitionOptions } from '../types/common';
import { Routes } from '../util/Routes';
import type { Room, RoomResolvable } from './Room';
import { NamedResource } from './NamedResource';
import { ApiLight } from '../types/api/light';
import { ApiResourceType } from '../types/api/common';
import Collection from '@discordjs/collection';
import { Zone, ZoneResolvable } from './Zone';
import { Device } from './Device';
import { Group } from './Group';
import { Bridge } from '../bridge/Bridge';

export type LightResolvable = Light | string;

export enum LightExtendedType {
	Normal = 'normal',
	Dimmable = 'dimmable',
	Temperature = 'temperature',
	Color = 'color',
	Gradient = 'gradient',
}

export interface LightOptions {
	name?: string;
}

export interface LightStateOptions {
	on?: boolean;
	brightness?: number;
	temperature?: number;
	color?: string;
	gradient?: string[];
}

/**
 * Represents a Hue light
 */
export class Light extends NamedResource<ApiLight> {
	type = ApiResourceType.Light;
	/**
	 * Extended type of the light e.g. color
	 */
	public extendedType = LightExtendedType.Normal;
	/**
	 * Capabilities e.g. color range
	 */
	public capabilities = new LightCapabilities(this);

	/**
	 * Connected device
	 */
	get device(): Device {
		return this.bridge.devices.cache.get(this.deviceId);
	}

	/**
	 * Connected device id
	 */
	get deviceId(): string {
		return this.data.owner?.rid;
	}

	/**
	 * Connected room
	 */
	get room(): Room {
		return this.bridge.rooms.cache.find((room) =>
			room.data.children.some((child) => child.rid === this.deviceId && child.rtype === ApiResourceType.Device),
		);
	}

	/**
	 * Connected room ID
	 */
	get roomId(): string {
		return this.room?.id;
	}

	/**
	 * Connected zones
	 */
	get zones(): Collection<string, Zone> {
		return this.bridge.zones.cache.filter((zone) =>
			zone.data.children.some((child) => child.rid === this.id && child.rtype === ApiResourceType.Light),
		);
	}

	/**
	 * Edits the state of the light
	 * @param state New state for the light
	 * @param transitionOptions
	 * @example
	 * light.state({ on: true });
	 */
	public async state(state: Pick<LightStateOptions, 'on'>, transitionOptions?: TransitionOptions): Promise<void> {
		await this._edit(Light.transformState(this.bridge, this, state), transitionOptions);
	}

	/**
	 * Edits the on state of all lights to true
	 * @param transitionOptions
	 */
	public async on(transitionOptions?: TransitionOptions): Promise<void> {
		await this.state({ on: true }, transitionOptions);
	}

	/**
	 * Edits the on state of all lights to false
	 * @param transitionOptions
	 */
	public async off(transitionOptions?: TransitionOptions): Promise<void> {
		await this.state({ on: false }, transitionOptions);
	}

	/**
	 * Toggles the on state of all lights
	 * @param transitionOptions
	 */
	public async toggle(transitionOptions?: TransitionOptions): Promise<void> {
		await this.state({ on: !this.isOn() }, transitionOptions);
	}

	/**
	 * Fetch this light from the bridge
	 */
	public async fetch(): Promise<Light> {
		await this.bridge.lights.fetch(this.id);
		return this;
	}

	/**
	 * Edits this light with new data e.g. new name
	 * @param options
	 */
	public async edit(options: LightOptions): Promise<void> {
		return await this._edit(Light.transform(options));
	}

	/**
	 * Adds this light to a group
	 * @param resolvable
	 */
	public async addToGroup(resolvable: RoomResolvable | ZoneResolvable): Promise<void> {
		let group: Group = this.bridge.rooms.resolve(resolvable as RoomResolvable);
		if (!group) group = this.bridge.zones.resolve(resolvable as ZoneResolvable);

		return await group.addLight(this);
	}

	/**
	 * Removes this light from a group
	 * @param resolvable
	 */
	public async removeFromGroup(resolvable: RoomResolvable | ZoneResolvable): Promise<void> {
		let group: Group = this.bridge.rooms.resolve(resolvable as RoomResolvable);
		if (!group) group = this.bridge.zones.resolve(resolvable as ZoneResolvable);

		return await group.removeLight(this);
	}

	/**
	 * Whether the light is on
	 */
	public isOn(): boolean {
		return this.data.on?.on;
	}

	/**
	 * Whether the light is a DimmableLight
	 */
	public isDimmable(): this is DimmableLight {
		return Boolean(this.extendedType === LightExtendedType.Dimmable);
	}

	/**
	 * Whether the light is a TemperatureLight
	 */
	public isTemperature(): this is TemperatureLight {
		return Boolean(this.extendedType === LightExtendedType.Temperature);
	}

	/**
	 * Whether the light is a ColorLight
	 */
	public isColor(): this is ColorLight {
		return Boolean(this.extendedType === LightExtendedType.Color);
	}

	/**
	 * Whether the light is a GradientLight
	 */
	public isGradient(): this is GradientLight {
		return Boolean(this.extendedType === LightExtendedType.Gradient);
	}

	/**
	 * Whether the light can do dimming
	 */
	public isCapableOfDimming(): this is DimmableLight | TemperatureLight | ColorLight | GradientLight {
		return Boolean(
			[
				LightExtendedType.Dimmable,
				LightExtendedType.Temperature,
				LightExtendedType.Color,
				LightExtendedType.Gradient,
			].includes(this.extendedType),
		);
	}

	/**
	 * Whether the light can display temperature
	 */
	public isCapableOfTemperature(): this is TemperatureLight | ColorLight | GradientLight {
		return Boolean(
			[LightExtendedType.Temperature, LightExtendedType.Color, LightExtendedType.Gradient].includes(this.extendedType),
		);
	}

	/**
	 * Whether the light can display color
	 */
	public isCapableOfColor(): this is ColorLight | GradientLight {
		return Boolean([LightExtendedType.Color, LightExtendedType.Gradient].includes(this.extendedType));
	}

	/**
	 * Whether the light is capable of gradient
	 */
	public isCapableOfGradient(): this is GradientLight {
		return Boolean(this.extendedType === LightExtendedType.Gradient);
	}

	/**
	 * Edits this group with raw API data structure
	 * @param data
	 * @param transitionOptions
	 * @protected
	 * @internal
	 */
	protected async _edit(data: ApiLight, transitionOptions?: TransitionOptions): Promise<void> {
		await this.bridge.rest.put(Routes.light.id(this.id), {
			...data,
			dynamics: { duration: transitionOptions?.duration },
		});
	}

	public static transform(options: LightOptions): ApiLight {
		return {
			metadata: options.name ? { name: options.name } : undefined,
		};
	}

	public static transformState(bridge: Bridge, resolvable: LightResolvable, options: LightStateOptions): ApiLight {
		const light = bridge.lights.resolve(resolvable);
		return {
			on: { on: options.on ?? true },
			dimming: light.isCapableOfDimming() && options.brightness ? { brightness: options.brightness } : undefined,
			color_temperature:
				light.isCapableOfTemperature() && options.temperature ? { mirek: options.temperature } : undefined,
			color:
				light.isCapableOfColor() && options.color
					? { xy: light.colorResolver.rgbToXyPoint(light.colorResolver.hexToRgb(options.color)) }
					: undefined,
			gradient:
				light.isCapableOfGradient() && options.gradient
					? {
							points: options.gradient.map((gradient) => {
								return {
									color: {
										xy: light.colorResolver.rgbToXyPoint(light.colorResolver.hexToRgb(gradient)),
									},
								};
							}),
					  }
					: undefined,
		};
	}
}
