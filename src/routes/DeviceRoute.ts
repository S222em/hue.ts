import { ResourceRoute } from './ResourceRoute';
import { ApiResourceType } from '../types/api/common';

const DeviceRoute = ResourceRoute.addPath(`/${ApiResourceType.Device}/:id`);

export { DeviceRoute };
