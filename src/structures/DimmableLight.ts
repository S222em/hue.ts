import { Light } from './Light';
import type { TransitionOptions } from '../types/common';

/**
 * Represents a Hue light capable of dimming
 */
export class DimmableLight extends Light {
	extendedType = Light.ExtendedType.Dimmable;

	/**
	 * Current brightness
	 */
	get brightness(): number {
		return this.data.dimming?.brightness;
	}

	/**
	 * Edits the state of the light
	 * @param state New state for the light
	 * @param transitionOptions
	 * @example
	 * light.state({ on: true, brightness: 100 });
	 */
	public async state(state: DimmableLightStateOptions, transitionOptions?: TransitionOptions): Promise<void> {
		await super.state(state, transitionOptions);
	}

	/**
	 * Edits the state of the light with a new brightness
	 * @param brightness Brightness between 0-100%
	 * @param transitionOptions
	 * @example
	 * light.setBrightness(100);
	 */
	public async setBrightness(
		brightness: DimmableLightStateOptions['brightness'],
		transitionOptions?: TransitionOptions,
	): Promise<void> {
		await this.state({ brightness }, transitionOptions);
	}
}

export type DimmableLightResolvable = DimmableLight | string;

export interface DimmableLightStateOptions extends Light.StateOptions {
	brightness?: number;
}

export namespace DimmableLight {
	export type Resolvable = DimmableLightResolvable;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export import ExtendedType = Light.ExtendedType;
	export type Options = Light.Options;
	export type StateOptions = DimmableLightStateOptions;
}
