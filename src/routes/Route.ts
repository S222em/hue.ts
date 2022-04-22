import { Util } from '../util/Util';

export type RouteLike = `/${string}`;

export interface RouteOptions {
	baseRoute: RouteLike;
	maxRequests: number;
	perInterval: number;
}

export class Route {
	public baseRoute: RouteLike;
	public id: string;
	public maxRequests: number;
	public perInterval: number;

	constructor(options: RouteOptions) {
		this.baseRoute = options.baseRoute;
		this.maxRequests = options.maxRequests;
		this.perInterval = options.perInterval;
	}

	public getRoute(): string {
		if (this.id) return this.baseRoute.replace(/:id/g, this.id) || this.baseRoute;
		else return this.baseRoute.replace(/:id/g, '') || this.baseRoute;
	}

	public addPath(path: string, rateLimitOptions?: Omit<RouteOptions, 'baseRoute'>): Route {
		const route = Util.clone(this);
		route.baseRoute = (this.baseRoute + path) as RouteLike;
		if (rateLimitOptions?.maxRequests) route.maxRequests = rateLimitOptions.maxRequests;
		if (rateLimitOptions?.perInterval) route.maxRequests = rateLimitOptions.perInterval;
		return route;
	}

	public addId(id: string): Route {
		const route = Util.clone(this);
		route.id = id;
		return route;
	}
}
