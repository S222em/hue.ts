import type { ApiLight } from '../../api';
import { DimmableLight } from './DimmableLight';
import { ResourceType } from './Resource';

export class TemperatureLight extends DimmableLight {
	type = ResourceType.TemperatureLight;
	public temperature: number;

	public patch(data: ApiLight.Object) {
		super._patch(data);
		if ('color_temperature' in data) {
			if ('mirek' in data) this.temperature = data.color_temperature.mirek;
		}
	}

	public async setTemperature(temperature: number, options?: { transition?: number }): Promise<void> {
		await this.edit({ color_temperature: { mirek: temperature } }, options?.transition);
	}

	public async setState(
		state: { on?: boolean; brightness?: number; temperature?: number },
		options?: { transition?: number },
	): Promise<void> {
		await this.edit(
			{
				on: { on: state.on },
				dimming: { brightness: state.brightness },
				color_temperature: { mirek: state.temperature },
			},
			options?.transition,
		);
	}
}
