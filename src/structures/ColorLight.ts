import { ColorResolver } from '../color/ColorResolver';
import { TemperatureLight } from './TemperatureLight';
import type { TransitionOptions } from '../types/common';
import { LightStateOptions } from '../transformers/LightStateTransformer';
import { LightExtendedType } from './Light';

/**
 * Represents a Hue light capable of displaying color
 */
export class ColorLight extends TemperatureLight {
	extendedType = LightExtendedType.Color;
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
	public async state(
		state: Pick<LightStateOptions, 'on' | 'brightness' | 'temperature' | 'color'>,
		transitionOptions?: TransitionOptions,
	): Promise<void> {
		await super.state(state, transitionOptions);
	}

	/**
	 * Edits the state of the light with a new color
	 * @param color Hex color
	 * @param transitionOptions
	 * @example
	 * light.setColor('#58ff05');
	 */
	public async setColor(color: LightStateOptions['color'], transitionOptions?: TransitionOptions): Promise<void> {
		await this.state({ color }, transitionOptions);
	}
}
