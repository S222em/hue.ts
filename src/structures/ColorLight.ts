import { ColorResolver } from '../color/ColorResolver';
import { TemperatureLight, TemperatureLightStateOptions } from './TemperatureLight';
import { ResourceType } from './Resource';
import type { TransitionOptions } from '../types/common';
import type { ApiLight } from '../types/api';

export interface ColorLightStateOptions extends TemperatureLightStateOptions {
	color?: string;
}

/**
 * Represents a hue light capable of colors
 */
export class ColorLight extends TemperatureLight {
	type = ResourceType.ColorLight;
	/**
	 * The current color of the light
	 */
	public color: string;
	protected _colorResolver: ColorResolver;

	/**
	 * Patches the resource with received data
	 * @internal
	 */
	public _patch(data: ApiLight): void {
		super._patch(data);
		if ('color' in data) {
			if ('gamut_type' in data.color) {
				this._colorResolver = new ColorResolver(this.capabilities);
			}
			if ('xy' in data.color) {
				const rgb = this._colorResolver.xyPointToRgb({
					...data.color.xy,
					bri: data.dimming?.brightness || this.brightness,
				});
				this.color = this._colorResolver.rgbToHex(rgb);
			}
		}
	}

	/**
	 * Edits the state of the light
	 */
	public async state(state: ColorLightStateOptions, transitionOptions?: TransitionOptions): Promise<void> {
		await this._edit(
			{
				on: { on: state.on ?? true },
				dimming: { brightness: state.brightness },
				color_temperature: { mirek: state.temperature },
				color: { xy: this._colorResolver.rgbToXyPoint(this._colorResolver.hexToRgb(state.color)) },
			},
			transitionOptions,
		);
	}
}
