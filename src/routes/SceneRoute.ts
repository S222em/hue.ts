import { ResourceRoute } from './ResourceRoute';
import { ApiResourceType } from '../types/api/common';

const SceneRoute = ResourceRoute.addPath(`/${ApiResourceType.Scene}/:id`);

export { SceneRoute };
