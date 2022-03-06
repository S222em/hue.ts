import { Light, LightStateOptions } from './Light';
import { ResourceType } from './Resource';
import type { TransitionOptions } from '../types/common';

export interface DimmableLightStateOptions extends LightStateOptions {
	brightness?: number;
}

/**
 * Represents a hue light capable of dimming
 */
export class DimmableLight extends Light {
	type = ResourceType.DimmableLight;

	get brightness(): number {
		return this.data.dimming?.brightness;
	}

	/**
	 * Edits the state of the light
	 */
	public async state(state: DimmableLightStateOptions, transitionOptions?: TransitionOptions): Promise<void> {
		await super.state(state, transitionOptions);
	}
}
