import { Resource } from './Resource';
import { APIResourceType } from '../api/ResourceType';
import { MotionManager } from '../managers/MotionManager';

export interface MotionEditOptions {
	enabled?: boolean;
}

export class Motion extends Resource<APIResourceType.Motion> {
	type = APIResourceType.Motion;

	get manager(): MotionManager {
		return this.hue.motions;
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

	public async disable(): Promise<string> {
		return await this.edit({ enabled: false });
	}

	public async enable(): Promise<string> {
		return await this.edit({ enabled: true });
	}

	public async edit(options: MotionEditOptions): Promise<string> {
		return await this.manager.edit(this.id, options);
	}
}
