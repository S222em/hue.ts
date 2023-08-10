import { Manager } from './Manager';
import { APIResourceType } from '../api/ResourceType';
import { Motion, MotionEditOptions } from '../structures/Motion';

/**
 * Manages the motion resource
 */
export class MotionManager extends Manager<APIResourceType.Motion> {
	type = APIResourceType.Motion;
	holds = Motion;

	/**
	 * Edits specified motion
	 * @param id
	 * @param options
	 * @example
	 * ```
	 * await hue.motions.edit('some-id', {
	 *    enabled: false,
	 * });
	 * ```
	 */
	public async edit(id: string, options: MotionEditOptions): Promise<string> {
		return await this._put(id, {
			enabled: options.enabled,
		});
	}
}
