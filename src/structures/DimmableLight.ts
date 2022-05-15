import { Light, LightExtendedType, LightStateOptions } from './Light';
import type { TransitionOptions } from '../types/common';

/**
 * Represents a Hue light capable of dimming
 */
export class DimmableLight extends Light {
	extendedType = LightExtendedType.Dimmable;

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
	public async state(
		state: Pick<LightStateOptions, 'on' | 'brightness'>,
		transitionOptions?: TransitionOptions,
	): Promise<void> {
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
		brightness: LightStateOptions['brightness'],
		transitionOptions?: TransitionOptions,
	): Promise<void> {
		await this.state({ brightness }, transitionOptions);
	}
}
