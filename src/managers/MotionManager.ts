import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { Motion, MotionEditOptions } from '../structures/Motion';

export class MotionManager extends Manager<ResourceType.Motion> {
	type = ResourceType.Motion;
	holds = Motion;

	public async edit(id: string, options: MotionEditOptions): Promise<void> {
		await this._put(id, {
			enabled: options.enabled,
		});
	}
}
