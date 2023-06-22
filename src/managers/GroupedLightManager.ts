import { Manager } from './Manager';
import { ApiResourceType } from '../api/ApiResourceType';
import { GroupedLight } from '../structures/GroupedLight';

export class GroupedLightManager extends Manager<ApiResourceType.GroupedLight> {
	type = ApiResourceType.GroupedLight;
	_resourceClass = GroupedLight;
}
