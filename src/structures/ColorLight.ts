import { ColorResolver } from '../color/ColorResolver';
import { TemperatureLight } from './TemperatureLight';
import type { TransitionOptions } from '../types/common';
import type { Bridge } from '../bridge/Bridge';
import { LightStateOptions } from '../transformers/LightStateTransformer';
import { LightExtendedType } from './Light';

export class ColorLight extends TemperatureLight {
	extendedType = LightExtendedType.Color;
	public colorResolver: ColorResolver;

	constructor(bridge: Bridge) {
		super(bridge);
		this.colorResolver = new ColorResolver(this.capabilities);
	}

	get color(): string {
		return this.colorResolver.rgbToHex(
			this.colorResolver.xyPointToRgb({
				x: this.data.color?.xy?.x,
				y: this.data.color?.xy?.y,
				bri: this.data.dimming?.brightness,
			}),
		);
	}

	public async state(
		state: Pick<LightStateOptions, 'on' | 'brightness' | 'temperature' | 'color'>,
		transitionOptions?: TransitionOptions,
	): Promise<void> {
		await super.state(state, transitionOptions);
	}

	public async setColor(color: LightStateOptions['color'], transitionOptions?: TransitionOptions): Promise<void> {
		await this.state({ color }, transitionOptions);
	}
}
