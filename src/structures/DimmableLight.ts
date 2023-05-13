import { Light, LightCapabilities, LightEditOptions } from './Light';
import { ApiResourceType, ApiResourceTypePut } from '../api/ApiResourceType';

export interface DimmableLightEditOptions extends LightEditOptions {
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

	public async setBrightness(brightness: DimmableLightEditOptions['brightness'], duration?: number): Promise<void> {
		await this.edit({ brightness, dynamics: { duration } });
	}

	public async edit(
		options: DimmableLightEditOptions,
		_inject?: ApiResourceTypePut<ApiResourceType.Light>,
	): Promise<void> {
		await super.edit(options, {
			dimming: { brightness: options.brightness },
			..._inject,
		});
	}
}
