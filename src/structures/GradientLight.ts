import { ColorLight } from './ColorLight';
import type { TransitionOptions } from '../types/common';
import { LightStateOptions } from '../transformers/LightStateTransformer';
import { LightExtendedType } from './Light';

/**
 * Represents a Hue light capable of gradients
 */
export class GradientLight extends ColorLight {
	extendedType = LightExtendedType.Gradient;

	/**
	 * Current gradient
	 */
	get gradient(): string[] {
		return this.data.gradient?.points?.map((point) => {
			return this.colorResolver.rgbToHex(
				this.colorResolver.xyPointToRgb({
					x: point.color?.xy?.x,
					y: point.color?.xy?.y,
					bri: this.data.dimming?.brightness,
				}),
			);
		});
	}

	/**
	 * Edits the state of the light
	 * @param state New state for the light
	 * @param transitionOptions
	 * @example
	 * light.state({ on: true, gradient: ['#58ff05','#1411bf'] });
	 */
	public async state(state: LightStateOptions, transitionOptions?: TransitionOptions): Promise<void> {
		await super.state(state, transitionOptions);
	}

	/**
	 * Edits the state of the light with a new gradient
	 * @param gradient Array of hex colors
	 * @param transitionOptions
	 * @example
	 * light.setGradient(['#58ff05','#1411bf']);
	 */
	public async setGradient(
		gradient: LightStateOptions['gradient'],
		transitionOptions?: TransitionOptions,
	): Promise<void> {
		await this.state({ gradient }, transitionOptions);
	}
}
