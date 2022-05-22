import { DimmableLight } from './DimmableLight';
import type { TransitionOptions } from '../types/common';
import { Light } from './Light';

/**
 * Represents a Hue light capable of displaying temperature
 */
export class TemperatureLight extends DimmableLight {
	extendedType = Light.ExtendedType.Temperature;

	/**
	 * The current temperature
	 */
	get temperature(): number {
		return this.data.color_temperature?.mirek;
	}

	/**
	 * Edits the state of the light
	 * @param state New state for the light
	 * @param transitionOptions
	 * @example
	 * light.state({ on: true });
	 */
	public async state(state: TemperatureLightStateOptions, transitionOptions?: TransitionOptions): Promise<void> {
		await super.state(state, transitionOptions);
	}

	/**
	 * Edits the state of the light with a new temperature
	 * @param temperature Temperature in mirek
	 * @param transitionOptions
	 * @example
	 * light.setTemperature(light.capabilities.maxTemperature);
	 */
	public async setTemperature(
		temperature: TemperatureLightStateOptions['temperature'],
		transitionOptions: TransitionOptions,
	): Promise<void> {
		await this.state({ temperature }, transitionOptions);
	}
}

export type TemperatureLightResolvable = TemperatureLight | string;

export interface TemperatureLightStateOptions extends DimmableLight.StateOptions {
	temperature?: number;
}

export namespace TemperatureLight {
	export type Resolvable = TemperatureLightResolvable;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export import ExtendedType = Light.ExtendedType;
	export type Options = Light.Options;
	export type StateOptions = TemperatureLightStateOptions;
}
