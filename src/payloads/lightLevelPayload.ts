import { RESTPayload } from '../types/rest';
import { LightLevelEditOptions } from '../structures/LightLevel';

export function createLightLevelPutPayload(options: LightLevelEditOptions): RESTPayload {
	return {
		enabled: options.enabled,
	};
}
