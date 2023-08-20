import { ResourceManager } from './ResourceManager';
import { APIResourceType } from '../types/api';
import { LightLevel, LightLevelEditOptions } from '../structures/LightLevel';
import { createLightLevelPutPayload } from '../payloads/lightLevelPayload';

/**
 * Manages the light_level resource
 */
export class LightLevelManager extends ResourceManager<LightLevel> {
	type = APIResourceType.LightLevel;
	holds = LightLevel;

	/**
	 * Edits specified light level
	 * @param id
	 * @param options
	 * @example
	 * ```
	 * await hue.lightLevels.edit('some-id', {
	 *    enabled: false,
	 * });
	 * ```
	 */
	public async edit(id: string, options: LightLevelEditOptions): Promise<string> {
		return await this._put(id, createLightLevelPutPayload(options));
	}
}
