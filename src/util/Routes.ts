import { Route } from '../bridge/rest/Route';
import { ApiResourceType } from '../types/api/common';

const base = new Route('/resource');

export const Routes = {
	resource: base,
	device: base.join(`/${ApiResourceType.Device}/:id`),
	groupedLight: base.join(`/${ApiResourceType.GroupedLight}/:id`),
	light: base.join(`/${ApiResourceType.Light}/:id`).setRatelimitOptions({ maxRequests: 10, perInterval: 1 }),
	room: base.join(`/${ApiResourceType.Room}/:id`),
	scene: base.join(`/${ApiResourceType.Scene}/:id`),
	zone: base.join(`/${ApiResourceType.Zone}/:id`),
};
