import { ColorResolver } from '../color/ColorResolver';
import { TemperatureLight, TemperatureLightStateOptions } from './TemperatureLight';
import type { TransitionOptions } from '../types/common';
import { LightExtendedType } from './Light';

export type ColorLightResolvable = ColorLight | string;

export interface ColorLightStateOptions extends TemperatureLightStateOptions {
	color?: string;
}

/**
 * Represents a Hue light capable of displaying color
 */
export class ColorLight extends TemperatureLight {
	public extendedType = LightExtendedType.Color;
	/**
	 * Resolves colors between hex, rgb and xy format
	 */
	public colorResolver = new ColorResolver(this.capabilities);

	/**
	 * Current color
	 */
	get color(): string {
		return this.colorResolver.rgbToHex(
			this.colorResolver.xyPointToRgb({
				x: this.data.color?.xy?.x,
				y: this.data.color?.xy?.y,
				brightnessInPercentage: this.data.dimming?.brightness,
			}),
		);
	}

	/**
	 * Edits the state of the light
	 * @param state New state for the light
	 * @param transitionOptions
	 * @example
	 * light.state({ on: true, color: '#58ff05' });
	 */
	public async state(state: ColorLightStateOptions, transitionOptions?: TransitionOptions): Promise<void> {
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
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore This will be fixed in a future API types refactor
			dynamics: { duration: transitionOptions?.duration },
		});
	}

	/**
	 * Edits the state of the light with a new color
	 * @param color Hex color
	 * @param transitionOptions
	 * @example
	 * light.setColor('#58ff05');
	 */
	public async setColor(color: ColorLightStateOptions['color'], transitionOptions?: TransitionOptions): Promise<void> {
		await this.state({ color }, transitionOptions);
	}
}
