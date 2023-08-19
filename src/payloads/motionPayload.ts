import { MotionEditOptions } from '../structures/Motion';
import { RESTPayload } from '../types/rest';

export function createMotionPutPayload(options: MotionEditOptions): RESTPayload {
	return {
		enabled: options.enabled,
	};
}
