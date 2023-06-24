import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { Motion } from '../structures/Motion';

export class MotionManager extends Manager<ResourceType.Motion> {
	type = ResourceType.Motion;
	_resourceClass = Motion;
}
