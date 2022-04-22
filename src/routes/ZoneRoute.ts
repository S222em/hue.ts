import { ResourceRoute } from './ResourceRoute';
import { ApiResourceType } from '../types/api/common';

const ZoneRoute = ResourceRoute.addPath(`/${ApiResourceType.Zone}/:id`);

export { ZoneRoute };
