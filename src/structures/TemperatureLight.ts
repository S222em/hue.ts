import { DimmableLight, DimmableLightStateOptions } from './DimmableLight';
import { ResourceType } from './Resource';
import type { TransitionOptions } from '../types/common';
import type { ApiLight } from '../types/api';

export interface TemperatureLightStateOptions extends DimmableLightStateOptions {
	temperature: number;
}

/**
 * Represents a hue Light capable of temperature
 */
export class TemperatureLight extends DimmableLight {
	type = ResourceType.TemperatureLight;
	/**
	 * The current temperature of the light
	 */
	public temperature: number;

	/**
	 * Patches the resource with received data
	 * @internal
	 */
	public patch(data: ApiLight) {
		super._patch(data);
		if ('color_temperature' in data) {
			if ('mirek' in data) this.temperature = data.color_temperature.mirek;
		}
	}

	/**
	 * Edits the state of the Light
	 */
	public async state(state: TemperatureLightStateOptions, transitionOptions?: TransitionOptions): Promise<void> {
		await this._edit(
			{
				on: { on: state.on ?? true },
				dimming: { brightness: state.brightness },
				color_temperature: { mirek: state.temperature },
			},
			transitionOptions,
		);
	}
}
