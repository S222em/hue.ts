import { ResourceManager } from './ResourceManager';
import { APIResourceType } from '../types/api';
import { Light, LightEditOptions } from '../structures/Light';
import { createLightPutPayload } from '../payloads/lightPayload';

/**
 * Manages the light resource
 */
export class LightManager extends ResourceManager<Light> {
	type = APIResourceType.Light;
	holds = Light;

	/**
	 * Edits specified light
	 * @param id
	 * @param options
	 * @example
	 * ```
	 * await hue.lights.edit('some-id', {
	 *    name: 'Some cool name',
	 *    on: true,
	 *    brightness: 50,
	 *    colorTemperature: 200,
	 * });
	 * ```
	 */
	public async edit(id: string, options: LightEditOptions): Promise<string> {
		return await this._put(id, createLightPutPayload(options));
	}
}
