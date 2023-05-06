import { LightExtendedType } from './Light';
import type { TransitionOptions } from '../types/common';
import { NormalLight, NormalLightStateOptions } from './NormalLight';

export type DimmableLightResolvable = DimmableLight | string;

export interface DimmableLightStateOptions extends NormalLightStateOptions {
	brightness?: number;
}

/**
 * Represents a Hue light capable of dimming
 */
export class DimmableLight extends NormalLight {
	public extendedType = LightExtendedType.Dimmable;

	/**
	 * Current brightness
	 */
	get brightness(): number {
		return this.data.dimming?.brightness;
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

	/**
	 * Edits the state of the light
	 * @param state New state for the light
	 * @param transitionOptions
	 * @example
	 * light.state({ on: true, brightness: 100 });
	 */
	public async state(state: DimmableLightStateOptions, transitionOptions?: TransitionOptions): Promise<void> {
		await this._edit({
			on: { on: state.on ?? true },
			dimming: {
				brightness: state.brightness,
			},
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore This will be fixed in a future API types refactor
			dynamics: { duration: transitionOptions?.duration },
		});
	}
}
