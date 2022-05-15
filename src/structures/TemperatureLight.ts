import { DimmableLight } from './DimmableLight';
import type { TransitionOptions } from '../types/common';
import { LightStateOptions } from '../transformers/LightState';
import { LightExtendedType } from './Light';

/**
 * Represents a Hue light capable of displaying temperature
 */
export class TemperatureLight extends DimmableLight {
	extendedType = LightExtendedType.Temperature;

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
	public async state(
		state: Pick<LightStateOptions, 'on' | 'brightness' | 'temperature'>,
		transitionOptions?: TransitionOptions,
	): Promise<void> {
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
		temperature: LightStateOptions['temperature'],
		transitionOptions: TransitionOptions,
	): Promise<void> {
		await this.state({ temperature }, transitionOptions);
	}
}
