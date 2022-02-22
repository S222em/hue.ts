import { Base } from './Base';
import type { Light } from './Light';
import { ColorResolver } from '../color/ColorResolver';
import type { GradientLight } from './GradientLight';

export interface SceneActionData {
	target: {
		rid: string;
		rtype: string;
	};
	action: {
		on: {
			on: boolean;
		};
		dimming?: {
			brightness: number;
		};
		color?: {
			xy: {
				x: number;
				y: number;
			};
		};
		color_temperature?: {
			mirek: number;
		};
		gradient?: {
			points: Array<{
				color: {
					xy: {
						x: number;
						y: number;
					};
				};
			}>;
		};
	};
}

export class SceneAction extends Base {
	public lightId: string;
	public on: boolean;
	public brightness: number;
	public temperature: number;
	public color: string;
	public gradient: string[];
	private _colorResolver: ColorResolver;

	public _patch(data: SceneActionData) {
		if ('target' in data) {
			if ('rid' in data.target) this.lightId = data.target.rid;
		}
		if ('action' in data) {
			if ('on' in data.action) {
				if ('on' in data.action.on) this.on = data.action.on.on;
			}
			if ('dimming' in data.action) {
				if ('brightness' in data.action.dimming) this.brightness = data.action.dimming.brightness;
			}
			if ('color_temperature' in data.action) {
				if ('mirek' in data.action.color_temperature) this.temperature = data.action.color_temperature.mirek;
			}
			if ('color' in data.action) {
				if ('xy' in data.action.color) {
					if (!this._colorResolver) this._colorResolver = new ColorResolver(this.light.capabilities);
					this.color = this._colorResolver.rgbToHex(
						this._colorResolver.xyPointToRgb({
							...data.action.color.xy,
							bri: data.action.dimming?.brightness,
						}),
					);
				}
			}
			if ('gradient' in data.action) {
				if ('points' in data.action.gradient)
					this.gradient = data.action.gradient.points.map((point) =>
						this._colorResolver.rgbToHex(
							this._colorResolver.xyPointToRgb({
								...point.color.xy,
								bri: data.action.dimming?.brightness,
							}),
						),
					);
			}
		}
	}

	get light(): Light {
		return this.bridge.lights.cache.get(this.lightId);
	}

	public async apply(options?: { transition?: number }) {
		const light = this.light as GradientLight;

		await light.setState(
			{
				on: this.on,
				brightness: this.brightness,
				temperature: this.temperature,
				color: this.color,
				gradient: this.gradient,
			},
			options,
		);
	}
}
