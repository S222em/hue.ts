import { Route } from './Route';

const ResourceRoute = new Route({
	baseRoute: '/resource',
	maxRequests: 1,
	perInterval: 1,
});

export { ResourceRoute };
