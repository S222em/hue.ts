import { Light, LightExtendedType } from './Light';
import type { TransitionOptions } from '../types/common';
import { LightStateOptions } from '../transformers/LightStateTransformer';

export class DimmableLight extends Light {
	extendedType = LightExtendedType.Dimmable;

	get brightness(): number {
		return this.data.dimming?.brightness;
	}

	public async state(
		state: Pick<LightStateOptions, 'on' | 'brightness'>,
		transitionOptions?: TransitionOptions,
	): Promise<void> {
		await super.state(state, transitionOptions);
	}

	public async setBrightness(
		brightness: LightStateOptions['brightness'],
		transitionOptions?: TransitionOptions,
	): Promise<void> {
		await this.state({ brightness }, transitionOptions);
	}
}
