import { ColorLight, ColorLightStateOptions } from './ColorLight';
import type { TransitionOptions } from '../types/common';
import { LightExtendedType } from './Light';

export type GradientLightResolvable = GradientLight | string;

export interface GradientLightStateOptions extends ColorLightStateOptions {
	gradient?: string[];
}

/**
 * Represents a Hue light capable of gradients
 */
export class GradientLight extends ColorLight {
	public extendedType = LightExtendedType.Gradient;

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
		await this._edit({
			on: { on: state.on ?? true },
			dimming: {
				brightness: state.brightness,
			},
			color_temperature: {
				mirek: state.temperature,
			},
			color: state.color
				? { xy: this.colorResolver.rgbToXyPoint(this.colorResolver.hexToRgb(state.color)) }
				: undefined,
			gradient: state.gradient
				? {
						points: state.gradient.map((gradient) => {
							return {
								color: {
									xy: this.colorResolver.rgbToXyPoint(this.colorResolver.hexToRgb(gradient)),
								},
							};
						}),
				  }
				: undefined,
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore This will be fixed in a future API types refactor
			dynamics: { duration: transitionOptions?.duration },
		});
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
