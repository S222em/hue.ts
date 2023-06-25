import { Resource } from './Resource';
import { ResourceType } from '../api/ResourceType';
import { MotionManager } from '../managers/MotionManager';

export interface MotionEditOptions {
	enabled?: boolean;
}

export class Motion extends Resource<ResourceType.Motion> {
	type = ResourceType.Motion;

	get manager(): MotionManager {
		return this.bridge.motions;
	}

	get enabled(): boolean {
		return this.data.enabled;
	}

	get motionDetected(): boolean {
		return this.data.motion.motion;
	}

	get motionValid(): boolean {
		return this.data.motion.motion_valid;
	}

	public async disable(): Promise<void> {
		return await this.edit({ enabled: false });
	}

	public async enable(): Promise<void> {
		return await this.edit({ enabled: true });
	}

	public async edit(options: MotionEditOptions): Promise<void> {
		await this.manager.edit(this.id, options);
	}
}
