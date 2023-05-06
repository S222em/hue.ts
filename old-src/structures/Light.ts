import { NamedResource } from './NamedResource';
import { ApiLight } from '../types/api/light';
import { ApiResourceType } from '../types/api/common';
import { DimmableLight } from './DimmableLight';
import { TemperatureLight } from './TemperatureLight';
import { ColorLight } from './ColorLight';
import { GradientLight } from './GradientLight';
import { LightCapabilities } from './LightCapabilities';
import { NormalLight } from './NormalLight';
import { Resource } from './Resource';

export type LightResolvable = Light | string;

export interface LightOptions {
	name?: string;
}

export enum LightExtendedType {
	Normal = 'normal',
	Dimmable = 'dimmable',
	Temperature = 'temperature',
	Color = 'color',
	Gradient = 'gradient',
}

export abstract class Light extends NamedResource<ApiLight> {
	public type = ApiResourceType.Light;
	public abstract extendedType: LightExtendedType;
	/**
	 * Capabilities e.g. color range
	 */
	public capabilities = new LightCapabilities(this);

	get owner(): Resource<any> | null {
		return this.bridge.resources.resolve(this.ownerId);
	}

	get ownerId(): string | null {
		return this.data.owner?.rid;
	}

	get ownerType(): ApiResourceType | null {
		return this.data.owner?.rtype;
	}

	/**
	 * Fetch this light from the bridge
	 */
	public async fetch(): Promise<NormalLight> {
		return await this.bridge.resources.fetch(this.id, ApiResourceType.Light);
	}

	/**
	 * Edits this light with new data e.g. new name
	 * @param options
	 */
	public async edit(options: LightOptions): Promise<void> {
		return await this._edit({
			metadata: {
				name: options.name,
			},
		});
	}

	public isNormal(): this is NormalLight {
		return this.extendedType === LightExtendedType.Normal;
	}

	public isDimmable(): this is DimmableLight {
		return this.extendedType === LightExtendedType.Dimmable;
	}

	public isTemperature(): this is TemperatureLight {
		return this.extendedType === LightExtendedType.Temperature;
	}

	public isColor(): this is ColorLight {
		return this.extendedType === LightExtendedType.Color;
	}

	public isGradient(): this is GradientLight {
		return this.extendedType === LightExtendedType.Gradient;
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
	 * @protected
	 * @internal
	 */
	protected async _edit(data: ApiLight): Promise<void> {
		await this.bridge.resources._edit(this, data);
	}
}
