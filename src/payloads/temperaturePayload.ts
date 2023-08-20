import { RESTPayload } from '../types/rest';
import { TemperatureEditOptions } from '../structures/Temperature';

export function createTemperaturePutPayload(options: TemperatureEditOptions): RESTPayload {
	return {
		enabled: options.enabled,
	};
}
