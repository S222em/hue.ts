import { Resource } from './Resource';
import { ApiResourceType } from '../api/ApiResourceType';

export interface MotionEditOptions {
	enabled?: boolean;
}
export class Motion extends Resource<ApiResourceType.Motion> {
	type = ApiResourceType.Motion;

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
		return await this._put({
			enabled: options.enabled,
		});
	}
}
