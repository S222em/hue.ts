import { ColorLight } from './ColorLight';
import type { TransitionOptions } from '../types/common';
import { Light } from './Light';

/**
 * Represents a Hue light capable of gradients
 */
export class GradientLight extends ColorLight {
	extendedType = Light.ExtendedType.Gradient;

	/**
	 * Current gradient
	 */
	get gradient(): string[] {
		return this.data.gradient?.points?.map((point) => {
			return this.colorResolver.rgbToHex(
				this.colorResolver.xyPointToRgb({
					x: point.color?.xy?.x,
					y: point.color?.xy?.y,
					brightnessInPercentage: this.data.dimming?.brightness,
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
	public async state(state: GradientLightStateOptions, transitionOptions?: TransitionOptions): Promise<void> {
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
		gradient: GradientLightStateOptions['gradient'],
		transitionOptions?: TransitionOptions,
	): Promise<void> {
		await this.state({ gradient }, transitionOptions);
	}
}

export type GradientLightResolvable = GradientLight | string;

export interface GradientLightStateOptions extends ColorLight.StateOptions {
	gradient?: string[];
}

export namespace GradientLight {
	export type Resolvable = GradientLightResolvable;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export import ExtendedType = Light.ExtendedType;
	export type Options = Light.Options;
	export type StateOptions = GradientLightStateOptions;
}
