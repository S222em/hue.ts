import { ResourceType } from '../ResourceType';

export interface MotionPut {
	type?: ResourceType.Motion;
	enabled?: boolean;
}
