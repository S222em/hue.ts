import { ResourceRoute } from './ResourceRoute';
import { ApiResourceType } from '../types/api/common';

const RoomRoute = ResourceRoute.addPath(`/${ApiResourceType.Room}/:id`);

export { RoomRoute };
