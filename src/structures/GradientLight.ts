import { ColorLight, ColorLightStateOptions } from './ColorLight';
import { ResourceType } from './Resource';
import type { TransitionOptions } from '../types/common';

export interface GradientLightStateOptions extends ColorLightStateOptions {
	gradient: string[];
}

/**
 * Represents a hue light capable of gradient
 */
export class GradientLight extends ColorLight {
	type = ResourceType.GradientLight;

	get gradient(): string[] {
		return this.data.gradient?.points?.map((point) => {
			return this.colorResolver.rgbToHex(
				this.colorResolver.xyPointToRgb({
					x: point.color?.xy?.x,
					y: point.color?.xy?.y,
					bri: this.data.dimming?.brightness,
				}),
			);
		});
	}

	/**
	 * Edits the state of the light
	 */
	public async state(state: GradientLightStateOptions, transitionOptions?: TransitionOptions): Promise<void> {
		await super.state(state, transitionOptions);
	}
}
