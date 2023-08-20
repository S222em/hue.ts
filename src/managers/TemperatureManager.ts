import { ResourceManager } from './ResourceManager';
import { APIResourceType } from '../types/api';
import { Temperature, TemperatureEditOptions } from '../structures/Temperature';
import { createTemperaturePutPayload } from '../payloads/temperaturePayload';

/**
 * Manages the temperature resource
 */
export class TemperatureManager extends ResourceManager<Temperature> {
	type = APIResourceType.Temperature;
	holds = Temperature;

	/**
	 * Edits specified temperature
	 * @param id
	 * @param options
	 * @example
	 * ```
	 * await hue.temperatures.edit('some-id', {
	 *    enabled: false,
	 * });
	 * ```
	 */
	public async edit(id: string, options: TemperatureEditOptions): Promise<string> {
		return await this._put(id, createTemperaturePutPayload(options));
	}
}
