import { ResourceManager } from './ResourceManager';
import { APIResourceType } from '../types/api';
import { Motion, MotionEditOptions } from '../structures/Motion';
import { createMotionPutPayload } from '../payloads/motionPayload';

/**
 * Manages the motion resource
 */
export class MotionManager extends ResourceManager<Motion> {
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
		return await this._put(id, createMotionPutPayload(options));
	}
}
