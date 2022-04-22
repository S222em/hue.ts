import { ResourceRoute } from './ResourceRoute';
import { ApiResourceType } from '../types/api/common';

const GroupedLightRoute = ResourceRoute.addPath(`/${ApiResourceType.GroupedLight}/:id`);

export { GroupedLightRoute };
