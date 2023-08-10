import { Manager } from './Manager';
import { APIResourceType } from '../api/ResourceType';
import { GroupedLight, GroupedLightEditOptions } from '../structures/GroupedLight';
import { transformColor, transformColorTemperature, transformDimming, transformOn } from '../util/Transformers';

/**
 * Manages the grouped_light resource
 */
export class GroupedLightManager extends Manager<APIResourceType.GroupedLight> {
	type = APIResourceType.GroupedLight;
	holds = GroupedLight;

	/**
	 * Edits specified groupedLight
	 * @param id
	 * @param options
	 * @example
	 * ```
	 * await hue.groupedLights.edit('some-id', {
	 *    on: true,
	 *    color: { x: 0.5, y: 0.3 },
	 * });
	 * ```
	 */
	public async edit(id: string, options: GroupedLightEditOptions): Promise<string> {
		return await this._put(id, {
			on: transformOn(options.on),
			dimming: transformDimming(options.brightness),
			color_temperature: transformColorTemperature(options.mirek),
			color: transformColor(options.color),
		});
	}
}
