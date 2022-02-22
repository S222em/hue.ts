import { ColorLight } from './ColorLight';
import type { ApiLight } from '../../api';
import { ResourceType } from './Resource';

export class GradientLight extends ColorLight {
	type = ResourceType.GradientLight;
	public gradient: Array<string>;

	public _patch(data: ApiLight.Object): void {
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

	public async setGradient(gradient: string[], options?: { transition?: number }): Promise<void> {
		const points = gradient.map((hex) => {
			const rgb = this._colorResolver.hexToRgb(hex);
			const point = this._colorResolver.rgbToXyPoint(rgb);

			return { color: { xy: point } };
		});

		await this.edit({ gradient: { points: points } }, options?.transition);
	}

	public async setState(
		state: {
			on?: boolean;
			brightness?: number;
			temperature?: number;
			color?: string;
			gradient?: string[];
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
				gradient: {
					points: state.gradient.map((hex) => {
						return { color: { xy: this._colorResolver.rgbToXyPoint(this._colorResolver.hexToRgb(hex)) } };
					}),
				},
			},
			options?.transition,
		);
	}
}
