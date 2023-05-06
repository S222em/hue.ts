import { DimmableLight, DimmableLightStateOptions } from './DimmableLight';
import type { TransitionOptions } from '../types/common';
import { LightExtendedType } from './Light';

export type TemperatureLightResolvable = TemperatureLight | string;

export interface TemperatureLightStateOptions extends DimmableLightStateOptions {
	temperature?: number;
}

/**
 * Represents a Hue light capable of displaying temperature
 */
export class TemperatureLight extends DimmableLight {
	public override extendedType = LightExtendedType.Temperature;

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
		await this._edit({
			on: { on: state.on ?? true },
			dimming: {
				brightness: state.brightness,
			},
			color_temperature: {
				mirek: state.temperature,
			},
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore This will be fixed in a future API types refactor
			dynamics: { duration: transitionOptions?.duration },
		});
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
