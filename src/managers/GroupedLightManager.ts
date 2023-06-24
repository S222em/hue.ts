import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { GroupedLight } from '../structures/GroupedLight';

export class GroupedLightManager extends Manager<ResourceType.GroupedLight> {
	type = ResourceType.GroupedLight;
	_resourceClass = GroupedLight;
}
