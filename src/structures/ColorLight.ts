import { ColorResolver } from '../color/ColorResolver';
import { TemperatureLight, TemperatureLightStateOptions } from './TemperatureLight';
import type { ApiLight } from '../api';
import { ResourceType } from './Resource';
import type { TransitionOptions } from '../types/common';

export interface ColorLightStateOptions extends TemperatureLightStateOptions {
	color?: string;
}

export class ColorLight extends TemperatureLight {
	type = ResourceType.ColorLight;
	public color: string;
	public gamutType: 'A' | 'B' | 'C';
	protected _colorResolver: ColorResolver;

	public _patch(data: ApiLight.Data): void {
		super._patch(data);
		if ('color' in data) {
			if ('gamut_type' in data.color) {
				this.gamutType = data.color.gamut_type;
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
