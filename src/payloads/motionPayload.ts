import { MotionEditOptions } from '../structures/Motion';
import { RESTMotionPutPayload } from '../api/Motion';

export function createMotionPutPayload(options: MotionEditOptions): RESTMotionPutPayload {
	return {
		enabled: options.enabled,
	};
}
