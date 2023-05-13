import { DimmableLight, DimmableLightEditOptions } from './DimmableLight';
import { LightCapabilities } from './Light';
import { ApiResourceType, ApiResourceTypePut } from '../api/ApiResourceType';

export interface MirekLightEditOptions extends DimmableLightEditOptions {
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

	public async setMirek(mirek: MirekLightEditOptions['mirek'], duration?: number): Promise<void> {
		await this.edit({ mirek, dynamics: { duration } });
	}

	public async edit(
		options: MirekLightEditOptions,
		_inject?: ApiResourceTypePut<ApiResourceType.Light>,
	): Promise<void> {
		await super.edit(options, {
			color_temperature: {
				mirek: options.mirek,
			},
			..._inject,
		});
	}
}
