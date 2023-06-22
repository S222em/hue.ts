import { ApiResourceType } from '../ApiResourceType';

export interface ApiMotionPut {
	type?: ApiResourceType.Motion;
	enabled?: boolean;
}
