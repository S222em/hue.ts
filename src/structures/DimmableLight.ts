import { Light, LightStateOptions } from './Light';
import { ResourceType } from './Resource';
import type { TransitionOptions } from '../types/common';
import type { ApiLight } from '../types/api';

export interface DimmableLightStateOptions extends LightStateOptions {
	brightness?: number;
}

export class DimmableLight extends Light {
	type = ResourceType.DimmableLight;
	public brightness: number;

	public _patch(data: ApiLight) {
		super._patch(data);
		if ('dimming' in data) this.brightness = data.dimming.brightness;
	}

	public async state(state: DimmableLightStateOptions, transitionOptions?: TransitionOptions): Promise<void> {
		await this._edit({ on: { on: state.on ?? true }, dimming: { brightness: state.brightness } }, transitionOptions);
	}
}
