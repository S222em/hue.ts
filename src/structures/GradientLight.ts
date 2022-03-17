import { ColorLight } from './ColorLight';
import { ResourceType } from './Resource';
import type { TransitionOptions } from '../types/common';
import { LightStateOptions } from '../transformers/LightStateTransformer';

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

	public async state(state: LightStateOptions, transitionOptions?: TransitionOptions): Promise<void> {
		await super.state(state, transitionOptions);
	}

	public async setGradient(
		gradient: LightStateOptions['gradient'],
		transitionOptions?: TransitionOptions,
	): Promise<void> {
		await this.state({ gradient }, transitionOptions);
	}
}
