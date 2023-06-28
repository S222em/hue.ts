import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { Motion, MotionEditOptions } from '../structures/Motion';

/**
 * Manages the motion resource
 */
export class MotionManager extends Manager<ResourceType.Motion> {
	type = ResourceType.Motion;
	holds = Motion;

	/**
	 * Edits specified motion
	 * @param id ID of the motion
	 * @param options Options for editing the motion
	 * @example
	 * ```
	 * await hue.motions.edit('some-id', {
	 *    enabled: false,
	 * });
	 * ```
	 */
	public async edit(id: string, options: MotionEditOptions): Promise<void> {
		await this._put(id, {
			enabled: options.enabled,
		});
	}
}
