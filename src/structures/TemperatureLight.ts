import { DimmableLight } from './DimmableLight';
import type { TransitionOptions } from '../types/common';
import { LightStateOptions } from '../transformers/LightStateTransformer';
import { LightExtendedType } from './Light';

export class TemperatureLight extends DimmableLight {
	extendedType = LightExtendedType.Temperature;

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
