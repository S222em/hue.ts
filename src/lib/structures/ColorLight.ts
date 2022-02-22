import { ColorResolver } from '../color/ColorResolver';
import { TemperatureLight } from './TemperatureLight';
import type { ApiLight } from '../../api';
import { ResourceType } from './Resource';

export class ColorLight extends TemperatureLight {
	type = ResourceType.ColorLight;
	public color: string;
	public gamutType: 'A' | 'B' | 'C';
	protected _colorResolver: ColorResolver;

	public _patch(data: ApiLight.Object): void {
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

	public async setColor(color: string, options?: { transition?: number }): Promise<void> {
		const rgb = this._colorResolver.hexToRgb(color);
		const point = this._colorResolver.rgbToXyPoint(rgb);

		await this.edit({ color: { xy: point } }, options?.transition);
	}

	public async setState(
		state: {
			on?: boolean;
			brightness?: number;
			temperature?: number;
			color?: string;
		},
		options?: { transition?: number },
	): Promise<void> {
		await this.edit(
			{
				on: { on: state.on },
				dimming: { brightness: state.brightness },
				color_temperature: { mirek: state.temperature },
				color: {
					xy: this._colorResolver.rgbToXyPoint(this._colorResolver.hexToRgb(state.color)),
				},
			},
			options?.transition,
		);
	}
}
