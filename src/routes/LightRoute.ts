import { ResourceRoute } from './ResourceRoute';
import { ApiResourceType } from '../types/api/common';

const LightRoute = ResourceRoute.addPath(`/${ApiResourceType.Light}/:id`, { maxRequests: 10, perInterval: 1 });

export { LightRoute };
