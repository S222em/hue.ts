import { ColorResolver } from '../color/ColorResolver';
import { TemperatureLight, TemperatureLightStateOptions } from './TemperatureLight';
import { ResourceType } from './Resource';
import type { TransitionOptions } from '../types/common';
import type { Bridge } from '../bridge/Bridge';

export interface ColorLightStateOptions extends TemperatureLightStateOptions {
	color?: string;
}

export class ColorLight extends TemperatureLight {
	type = ResourceType.ColorLight;
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

	public async state(state: ColorLightStateOptions, transitionOptions?: TransitionOptions): Promise<void> {
		await super.state(state, transitionOptions);
	}

	public async setColor(color: ColorLightStateOptions['color'], transitionOptions?: TransitionOptions): Promise<void> {
		await this.state({ color }, transitionOptions);
	}
}
