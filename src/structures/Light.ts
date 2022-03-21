import type { TemperatureLight } from './TemperatureLight';
import type { ColorLight } from './ColorLight';
import type { DimmableLight } from './DimmableLight';
import type { GradientLight } from './GradientLight';
import { LightCapabilities } from './LightCapabilities';
import type { TransitionOptions } from '../types/common';
import { Routes } from '../util/Routes';
import type { Room, RoomResolvable } from './Room';
import { NamedResource } from './NamedResource';
import { LightStateOptions, lightStateTransformer } from '../transformers/LightStateTransformer';
import { ApiLight } from '../types/api/light';
import { ApiResourceType } from '../types/api/common';
import Collection from '@discordjs/collection';
import { Zone, ZoneResolvable } from './Zone';
import { Device } from './Device';
import { LightEditOptions, lightEditTransformer } from '../transformers/LightEditTransformer';
import { Group } from './Group';

export type LightResolvable = Light | string;

export enum LightExtendedType {
	Normal = 'normal',
	Dimmable = 'dimmable',
	Temperature = 'temperature',
	Color = 'color',
	Gradient = 'gradient',
}

export class Light extends NamedResource<ApiLight> {
	type = ApiResourceType.Light;
	public extendedType = LightExtendedType.Normal;
	public capabilities = new LightCapabilities(this);

	get device(): Device {
		return this.bridge.devices.cache.get(this.deviceId);
	}

	get deviceId(): string {
		return this.data.owner?.rid;
	}

	get room(): Room {
		return this.bridge.rooms.cache.find((room) =>
			room.data.children.some((child) => child.rid === this.deviceId && child.rtype === ApiResourceType.Device),
		);
	}

	get roomId(): string {
		return this.room?.id;
	}

	get zones(): Collection<string, Zone> {
		return this.bridge.zones.cache.filter((zone) =>
			zone.data.children.some((child) => child.rid === this.id && child.rtype === ApiResourceType.Light),
		);
	}

	public async state(state: Pick<LightStateOptions, 'on'>, transitionOptions?: TransitionOptions): Promise<void> {
		await this._edit(lightStateTransformer(state, this), transitionOptions);
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

	public async fetch(): Promise<Light> {
		await this.bridge.lights.fetch(this.id);
		return this;
	}

	public async edit(options: LightEditOptions): Promise<void> {
		return await this._edit(lightEditTransformer(options));
	}

	public async addToGroup(resolvable: RoomResolvable | ZoneResolvable): Promise<void> {
		let group: Group = this.bridge.rooms.resolve(resolvable as RoomResolvable);
		if (!group) group = this.bridge.zones.resolve(resolvable as ZoneResolvable);

		return await group.addLight(this);
	}

	public async removeFromGroup(resolvable: RoomResolvable | ZoneResolvable): Promise<void> {
		let group: Group = this.bridge.rooms.resolve(resolvable as RoomResolvable);
		if (!group) group = this.bridge.zones.resolve(resolvable as ZoneResolvable);

		return await group.removeLight(this);
	}

	public isOn(): boolean {
		return this.data.on?.on;
	}

	public isDimmable(): this is DimmableLight | TemperatureLight | ColorLight | GradientLight {
		return Boolean(
			[
				LightExtendedType.Dimmable,
				LightExtendedType.Temperature,
				LightExtendedType.Color,
				LightExtendedType.Gradient,
			].includes(this.extendedType),
		);
	}

	public isTemperature(): this is TemperatureLight | ColorLight | GradientLight {
		return Boolean(
			[LightExtendedType.Temperature, LightExtendedType.Color, LightExtendedType.Gradient].includes(this.extendedType),
		);
	}

	public isColor(): this is ColorLight | GradientLight {
		return Boolean([LightExtendedType.Color, LightExtendedType.Gradient].includes(this.extendedType));
	}

	public isGradient(): this is GradientLight {
		return Boolean(this.extendedType === LightExtendedType.Gradient);
	}

	protected async _edit(data: ApiLight, transition?: TransitionOptions): Promise<void> {
		await this.bridge.rest.put(Routes.light(this.id), {
			...data,
			dynamics: { duration: transition?.duration },
		});
	}
}
