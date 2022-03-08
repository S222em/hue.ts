import { Light, LightStateOptions } from './Light';
import { ResourceType } from './Resource';
import type { TransitionOptions } from '../types/common';

export interface DimmableLightStateOptions extends LightStateOptions {
	brightness?: number;
}

export class DimmableLight extends Light {
	type = ResourceType.DimmableLight;

	get brightness(): number {
		return this.data.dimming?.brightness;
	}

	public async state(state: DimmableLightStateOptions, transitionOptions?: TransitionOptions): Promise<void> {
		await super.state(state, transitionOptions);
	}

	public async setBrightness(
		brightness: DimmableLightStateOptions['brightness'],
		transitionOptions?: TransitionOptions,
	): Promise<void> {
		await this.state({ brightness }, transitionOptions);
	}
}
