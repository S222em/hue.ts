import { DimmableLight, DimmableLightStateOptions } from './DimmableLight';
import { ResourceType } from './Resource';
import type { TransitionOptions } from '../types/common';

export interface TemperatureLightStateOptions extends DimmableLightStateOptions {
	temperature: number;
}

/**
 * Represents a hue Light capable of temperature
 */
export class TemperatureLight extends DimmableLight {
	type = ResourceType.TemperatureLight;

	get temperature(): number {
		return this.data.color_temperature?.mirek;
	}

	/**
	 * Edits the state of the Light
	 */
	public async state(state: TemperatureLightStateOptions, transitionOptions?: TransitionOptions): Promise<void> {
		await super.state(state, transitionOptions);
	}
}
