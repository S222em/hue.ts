import { Light, LightCapabilities, LightStateOptions } from './Light';
import { ApiResourceType, ApiResourceTypePut } from '../api/ApiResourceType';

export interface DimmableLightStateOptions extends LightStateOptions {
	brightness?: number;
}

export class DimmableLight extends Light {
	public capabilities = LightCapabilities.Dimming;

	get brightness(): number {
		return this.data.dimming!.brightness;
	}

	get minBrightnessLevel(): number | undefined {
		return this.data.dimming!.min_dim_level;
	}

	public async setBrightness(brightness: DimmableLightStateOptions['brightness'], duration?: number): Promise<void> {
		return await this.state({ brightness, dynamics: { duration } });
	}

	public async state(
		options: DimmableLightStateOptions,
		_inject?: ApiResourceTypePut<ApiResourceType.Light>,
	): Promise<void> {
		return await super.state(options, {
			dimming: { brightness: options.brightness },
			..._inject,
		});
	}
}
