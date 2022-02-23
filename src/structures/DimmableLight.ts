import { Light, LightStateOptions } from './Light';
import { ResourceType } from './Resource';
import type { TransitionOptions } from '../types/common';
import type { ApiLight } from '../types/api';

export interface DimmableLightStateOptions extends LightStateOptions {
	brightness?: number;
}

/**
 * Represents a hue light capable of dimming
 */
export class DimmableLight extends Light {
	type = ResourceType.DimmableLight;
	/**
	 * The current brightness of the light
	 */
	public brightness: number;

	/**
	 * Patches the resource with received data
	 * @internal
	 */
	public _patch(data: ApiLight) {
		super._patch(data);
		if ('dimming' in data) this.brightness = data.dimming.brightness;
	}

	/**
	 * Edits the state of the light
	 */
	public async state(state: DimmableLightStateOptions, transitionOptions?: TransitionOptions): Promise<void> {
		await this._edit({ on: { on: state.on ?? true }, dimming: { brightness: state.brightness } }, transitionOptions);
	}
}
