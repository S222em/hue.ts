import type { TemperatureLight } from './TemperatureLight';
import type { ColorLight } from './ColorLight';
import type { DimmableLight } from './DimmableLight';
import type { GradientLight } from './GradientLight';
import { LightCapabilities } from './LightCapabilities';
import type { TransitionOptions } from '../types/common';
import { LightZoneManager } from '../managers/LightZoneManager';
import { Routes } from '../util/Routes';
import type { Room } from './Room';
import type { Bridge } from '../bridge/Bridge';
import { NamedResource } from './NamedResource';
import { LightStateOptions, lightStateTransformer } from '../transformers/LightStateTransformer';
import { ApiLight } from '../types/api/light';
import { ApiResourceType } from '../types/api/common';

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
	public extendedType: LightExtendedType = LightExtendedType.Normal;
	public capabilities: LightCapabilities;
	public zones: LightZoneManager;

	constructor(bridge: Bridge) {
		super(bridge);
		this.capabilities = new LightCapabilities(this);
		this.zones = new LightZoneManager(this);
	}

	get room(): Room {
		return this.bridge.rooms.cache.find((room) => room.lights.cache.has(this.id));
	}

	get roomId(): string {
		return this.room?.id;
	}

	public async state(state: Pick<LightStateOptions, 'on'>, transitionOptions?: TransitionOptions): Promise<void> {
		await this._edit(lightStateTransformer(this, state), transitionOptions);
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
