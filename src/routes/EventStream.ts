import { Route } from './Route';

const EventStreamRoute = new Route({
	baseRoute: '/eventstream/clip/v2',
	maxRequests: 1,
	perInterval: 1,
});

export { EventStreamRoute };
