import { DimmableLight } from './DimmableLight';
import { ResourceType } from './Resource';
import type { TransitionOptions } from '../types/common';
import { LightStateOptions } from '../transformers/LightStateTransformer';

export class TemperatureLight extends DimmableLight {
	type = ResourceType.TemperatureLight;

	get temperature(): number {
		return this.data.color_temperature?.mirek;
	}

	public async state(
		state: Pick<LightStateOptions, 'on' | 'brightness' | 'temperature'>,
		transitionOptions?: TransitionOptions,
	): Promise<void> {
		await super.state(state, transitionOptions);
	}

	public async setTemperature(
		temperature: LightStateOptions['temperature'],
		transitionOptions: TransitionOptions,
	): Promise<void> {
		await this.state({ temperature }, transitionOptions);
	}
}
