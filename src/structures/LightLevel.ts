import { APIResource, APIResourceIdentifier, APIResourceType } from '../types/api';
import { Resource } from './Resource';

export interface APILightLevel extends APIResource<APIResourceType.LightLevel> {
	owner: APIResourceIdentifier;
	enabled: boolean;
	light: {
		light_level: number;
		light_level_valid: boolean;
	};
}

export interface LightLevelEditOptions {
	enabled?: boolean;
}

/**
 * Represents the light_level resource from the hue API
 */
export class LightLevel extends Resource<APILightLevel> {
	type = APIResourceType.LightLevel;

	/**
	 * ID of this temperature's owner
	 */
	get ownerId(): string {
		return this.data.owner.rid;
	}

	/**
	 * Whether this temperature sensor is enabled
	 */
	get enabled(): boolean {
		return this.data.enabled;
	}

	/**
	 * The current measured light level in 10000*log(lux)+1
	 */
	get lightLevel(): number {
		return this.data.light.light_level;
	}

	/**
	 * Whether the measured light level is valid
	 */
	get lightLevelValid(): boolean {
		return this.data.light.light_level_valid;
	}

	/**
	 * Disables this light level sensor
	 */
	public async disable(): Promise<string> {
		return await this.edit({ enabled: false });
	}

	/**
	 * Enables this light level sensor
	 */
	public async enable(): Promise<string> {
		return await this.edit({ enabled: true });
	}

	/**
	 * Edits this light level
	 * @param options
	 */
	public async edit(options: LightLevelEditOptions): Promise<string> {
		return await this.hue.lightLevels.edit(this.id, options);
	}
}
