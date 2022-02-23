import { DimmableLight, DimmableLightStateOptions } from './DimmableLight';
import { ResourceType } from './Resource';
import type { TransitionOptions } from '../types/common';
import type { ApiLight } from '../types/api';

export interface TemperatureLightStateOptions extends DimmableLightStateOptions {
	temperature: number;
}

export class TemperatureLight extends DimmableLight {
	type = ResourceType.TemperatureLight;
	public temperature: number;

	public patch(data: ApiLight) {
		super._patch(data);
		if ('color_temperature' in data) {
			if ('mirek' in data) this.temperature = data.color_temperature.mirek;
		}
	}

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
