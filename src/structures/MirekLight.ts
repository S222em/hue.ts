import { DimmableLight, DimmableLightStateOptions } from './DimmableLight';
import { LightCapabilities } from './Light';
import { ApiResourceType, ApiResourceTypePut } from '../api/ApiResourceType';

export interface MirekLightStateOptions extends DimmableLightStateOptions {
	mirek?: number;
}

export class MirekLight extends DimmableLight {
	public capabilities = LightCapabilities.Mirek;

	get mirek(): number {
		return this.data.color_temperature!.mirek;
	}

	get minMirek(): number {
		return this.data.color_temperature!.mirek_schema.mirek_minimum;
	}

	get maxMirek(): number {
		return this.data.color_temperature!.mirek_schema.mirek_maximum;
	}

	public async setMirek(mirek: MirekLightStateOptions['mirek'], duration?: number): Promise<void> {
		return await this.state({ mirek, dynamics: { duration } });
	}

	public async state(
		options: MirekLightStateOptions,
		_inject?: ApiResourceTypePut<ApiResourceType.Light>,
	): Promise<void> {
		return await super.state(options, {
			color_temperature: {
				mirek: options.mirek,
			},
			..._inject,
		});
	}
}
