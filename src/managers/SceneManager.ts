import { Manager } from './Manager';
import { ApiResourceType } from '../api/ApiResourceType';
import { Scene } from '../structures/Scene';

export class SceneManager extends Manager<ApiResourceType.Scene> {
	type = ApiResourceType.Scene;
	_resourceClass = Scene;
}
