import { ColorLight, ColorLightStateOptions } from './ColorLight';
import { ResourceType } from './Resource';
import type { TransitionOptions } from '../types/common';
import type { ApiLight } from '../types/api';

export interface GradientLightStateOptions extends ColorLightStateOptions {
	gradient: string[];
}

/**
 * Represents a hue light capable of gradient
 */
export class GradientLight extends ColorLight {
	type = ResourceType.GradientLight;
	/**
	 * The current gradient of the light
	 */
	public gradient: Array<string>;

	/**
	 * Patches the resource with received data
	 * @internal
	 */
	public _patch(data: ApiLight): void {
		super._patch(data);
		if ('gradient' in data) {
			if ('points' in data.gradient) {
				this.gradient = data.gradient.points.map((point) => {
					const rgb = this._colorResolver.xyPointToRgb({
						...point.color.xy,
						bri: data.dimming?.brightness || this.brightness,
					});
					return this._colorResolver.rgbToHex(rgb);
				});
			}
		}
	}

	/**
	 * Edits the state of the light
	 */
	public async state(state: GradientLightStateOptions, transitionOptions?: TransitionOptions): Promise<void> {
		await this._edit(
			{
				on: { on: state.on ?? true },
				dimming: { brightness: state.brightness },
				color_temperature: { mirek: state.temperature },
				color: { xy: this._colorResolver.rgbToXyPoint(this._colorResolver.hexToRgb(state.color)) },
				gradient: {
					points: state.gradient
						? state.gradient.map((color) => {
								return {
									color: {
										xy: this._colorResolver.rgbToXyPoint(this._colorResolver.hexToRgb(color)),
									},
								};
						  })
						: undefined,
				},
			},
			transitionOptions,
		);
	}
}
