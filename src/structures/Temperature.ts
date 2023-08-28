import { APIResource, APIResourceIdentifier, APIResourceType } from '../types/api';
import { Resource } from './Resource';

export interface TemperatureEditOptions {
	enabled?: boolean;
}

/**
 * Represents the temperature resource from the hue API
 */
export class Temperature extends Resource<APITemperature> {
	type = APIResourceType.Temperature;

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
	 * The current measured temperature in Celsius, rounded to whole numbers
	 */
	get temperature(): number {
		return this.data.temperature.temperature;
	}

	/**
	 * Whether the measured temperature is valid
	 */
	get temperatureValid(): boolean {
		return this.data.temperature.temperature_valid;
	}

	/**
	 * Disables this temperature sensor
	 */
	public async disable(): Promise<string> {
		return await this.edit({ enabled: false });
	}

	/**
	 * Enables this temperature sensor
	 */
	public async enable(): Promise<string> {
		return await this.edit({ enabled: true });
	}

	/**
	 * Edits this temperature
	 * @param options
	 */
	public async edit(options: TemperatureEditOptions): Promise<string> {
		return await this.hue.temperatures.edit(this.id, options);
	}
}

export interface APITemperature extends APIResource<APIResourceType.Temperature> {
	owner: APIResourceIdentifier;
	enabled: boolean;
	temperature: {
		temperature: number;
		temperature_valid: boolean;
	};
}
