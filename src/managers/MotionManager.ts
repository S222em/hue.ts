import { Manager } from './Manager';
import { ApiResourceType } from '../api/ApiResourceType';
import { Motion } from '../structures/Motion';

export class MotionManager extends Manager<ApiResourceType.Motion> {
	type = ApiResourceType.Motion;
	_resourceClass = Motion;
}
