import { ApiDevice } from './api/device';
import { ApiRoom } from './api/room';
import { ApiZone } from './api/zone';
import { ApiLight } from './api/light';
import { ApiGroupedLight } from './api/grouped_light';
import { ApiScene } from './api/scene';

export interface TransitionOptions {
	duration?: number;
}

export type ApiResourceLike = ApiDevice | ApiRoom | ApiZone | ApiLight | ApiGroupedLight | ApiScene;
