import { ResourceManager } from './ResourceManager';
import { APIResourceType } from '../types/api';
import { GroupedLight, GroupedLightEditOptions } from '../structures/GroupedLight';
import { createGroupedLightPutPayload } from '../payloads/groupedLightPayload';

/**
 * Manages the grouped_light resource
 */
export class GroupedLightManager extends ResourceManager<GroupedLight> {
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
		return await this._put(id, createGroupedLightPutPayload(options));
	}
}
