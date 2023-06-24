import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { Scene } from '../structures/Scene';

export class SceneManager extends Manager<ResourceType.Scene> {
	type = ResourceType.Scene;
	_resourceClass = Scene;
}
