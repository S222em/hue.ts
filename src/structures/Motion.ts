import { Resource } from './Resource';
import { APIResource, APIResourceIdentifier, APIResourceType } from '../types/api';

export interface APIMotion extends APIResource<APIResourceType.Motion> {
	owner: APIResourceIdentifier;
	enabled: boolean;
	motion: {
		motion: boolean;
		motion_valid: boolean;
	};
}

export interface MotionEditOptions {
	enabled?: boolean;
}

/**
 * Represents the motion resource from the hue API
 */
export class Motion extends Resource<APIMotion> {
	type = APIResourceType.Motion;

	/**
	 * Whether this motions sensor is enabled
	 */
	get enabled(): boolean {
		return this.data.enabled;
	}

	/**
	 * Whether motion is detected
	 */
	get motionDetected(): boolean {
		return this.data.motion.motion;
	}

	/**
	 * Indicates if detected motion is valid
	 */
	get motionValid(): boolean {
		return this.data.motion.motion_valid;
	}

	/**
	 * Disables this motions sensor
	 */
	public async disable(): Promise<string> {
		return await this.edit({ enabled: false });
	}

	/**
	 * Enables this motions sensor
	 */
	public async enable(): Promise<string> {
		return await this.edit({ enabled: true });
	}

	/**
	 * Edits this motion
	 * @param options
	 */
	public async edit(options: MotionEditOptions): Promise<string> {
		return await this.hue.motions.edit(this.id, options);
	}
}
