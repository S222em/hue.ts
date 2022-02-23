import { Base } from './Base';
import type { Light } from './Light';
import { ColorResolver } from '../color/ColorResolver';
import type { GradientLight } from './GradientLight';
import type { TransitionOptions } from '../types/common';
import type { ApiSceneAction } from '../types/api';

/**
 * Represents a Scene Action
 */
export class SceneAction extends Base {
	/**
	 * Whether the target light is on in this Scene
	 */
	public on: boolean;
	/**
	 * The brightness of the target Light in this Scene
	 */
	public brightness: number;
	/**
	 * The temperature of the target Light in this Scene
	 */
	public temperature: number;
	/**
	 * The color of the target Light in this Scene
	 */
	public color: string;
	/**
	 * The gradient of the target Light in this Scene
	 */
	public gradient: string[];
	/**
	 * The id of the target Light
	 */
	public lightId: string;
	private _colorResolver: ColorResolver;

	/**
	 * Patches the resource with received data
	 * @internal
	 */
	public _patch(data: ApiSceneAction) {
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

	/**
	 * The target Light
	 */
	get light(): Light {
		return this.bridge.lights.cache.get(this.lightId);
	}

	/**
	 * Applies this Scene Action to the target light
	 */
	public async apply(transitionOptions?: TransitionOptions) {
		const light = this.light as GradientLight;

		await light.state(
			{
				on: this.on,
				brightness: this.brightness,
				temperature: this.temperature,
				color: this.color,
				gradient: this.gradient,
			},
			transitionOptions,
		);
	}
}
