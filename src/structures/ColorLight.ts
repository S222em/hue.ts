import { ColorResolver } from '../color/ColorResolver';
import { TemperatureLight } from './TemperatureLight';
import type { TransitionOptions } from '../types/common';
import { Light } from './Light';

/**
 * Represents a Hue light capable of displaying color
 */
export class ColorLight extends TemperatureLight {
	extendedType = Light.ExtendedType.Color;
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
				bri: this.data.dimming?.brightness,
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
		await super.state(state, transitionOptions);
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

export type ColorLightResolvable = ColorLight | string;

export interface ColorLightStateOptions extends TemperatureLight.StateOptions {
	color?: string;
}

export namespace ColorLight {
	export type Resolvable = ColorLightResolvable;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export import ExtendedType = Light.ExtendedType;
	export type Options = Light.Options;
	export type StateOptions = ColorLightStateOptions;
}
