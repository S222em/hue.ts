import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { Light } from '../structures/Light';

export class LightManager extends Manager<ResourceType.Light> {
	type = ResourceType.Light;
	_resourceClass = Light;
}
