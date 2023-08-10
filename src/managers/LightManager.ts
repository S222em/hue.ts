import { Manager } from './Manager';
import { APIResourceType } from '../api/ResourceType';
import { Light, LightEditOptions } from '../structures/Light';
import {
	transformColor,
	transformColorTemperature,
	transformDimming,
	transformDynamics,
	transformEffects,
	transformGradient,
	transformMetadataWithArcheType,
	transformOn,
	transformTimedEffects,
} from '../util/Transformers';

/**
 * Manages the light resource
 */
export class LightManager extends Manager<APIResourceType.Light> {
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
		return await this._put(id, {
			metadata: transformMetadataWithArcheType(options),
			on: transformOn(options.on),
			dynamics: transformDynamics(options.dynamics),
			effects: transformEffects(options.effect),
			timed_effects: transformTimedEffects(options.timedEffects),
			dimming: transformDimming(options.brightness ?? options.color?.z),
			color_temperature: transformColorTemperature(options.colorTemperature),
			color: transformColor(options.color),
			gradient: transformGradient(options.gradient),
		});
	}
}
