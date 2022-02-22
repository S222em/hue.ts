import { Light } from './Light';
import type { ApiLight } from '../../api';
import { ResourceType } from './Resource';

export class DimmableLight extends Light {
	type = ResourceType.DimmableLight;
	public brightness: number;

	public _patch(data: ApiLight.Data) {
		super._patch(data);
		if ('dimming' in data) this.brightness = data.dimming.brightness;
	}

	public async setBrightness(brightness: number, options?: { transition?: number }): Promise<void> {
		await this.edit({ dimming: { brightness } }, options?.transition);
	}

	public async setState(
		state: { on?: boolean; brightness?: number },
		options?: { transition?: number },
	): Promise<void> {
		await this.edit({ on: { on: state.on }, dimming: { brightness: state.brightness } }, options?.transition);
	}
}
