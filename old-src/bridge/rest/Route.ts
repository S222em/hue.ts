import { Util } from '../../util/Util';

export type RouteLike = `/${string}`;

export interface RouteOptions {
	baseRoute: RouteLike;
	maxRequests: number;
	perInterval: number;
}

export interface RouteRateLimitOptions {
	maxRequests: number;
	perInterval: number;
}

export class Route {
	public base: RouteLike;
	public ratelimit: RouteRateLimitOptions = { maxRequests: 1, perInterval: 1 };
	private _id?: string;

	constructor(base: RouteLike, ratelimit?: RouteRateLimitOptions) {
		this.base = base;
		if (ratelimit) this.setRatelimitOptions(ratelimit);
	}

	public join(route: RouteLike): Route {
		return new Route((this.base + route) as RouteLike, this.ratelimit);
	}

	public setRatelimitOptions(ratelimit: RouteRateLimitOptions): this {
		this.ratelimit = ratelimit;

		return this;
	}

	public route(): string {
		if (this.id) return this.base.replace(/:id/g, this._id);
		else return this.base.replace(/:id/g, '');
	}

	public global(): Route {
		return Util.clone(this);
	}

	public id(id: string): Route {
		const clone = Util.clone(this);
		clone._id = id;
		return clone;
	}
}
