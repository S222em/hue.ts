import { RouteHandlerOptions } from '../bridge/rest/RouteRateLimit';
import { ApiResourceType } from '../types/api/common';

export class Routes {
	public static resourceRateLimit = {
		interval: 1,
		maxRequests: 1,
	} as RouteHandlerOptions;

	public static deviceRateLimit = {
		interval: 1,
		maxRequests: 1,
	} as RouteHandlerOptions;

	public static lightRateLimit = {
		interval: 1,
		maxRequests: 10,
	} as RouteHandlerOptions;

	public static groupedLightRateLimit = {
		interval: 1,
		maxRequests: 1,
	} as RouteHandlerOptions;

	public static roomRateLimit = {
		interval: 1,
		maxRequests: 1,
	} as RouteHandlerOptions;

	public static zoneRateLimit = {
		interval: 1,
		maxRequests: 1,
	} as RouteHandlerOptions;

	public static sceneRateLimit = {
		interval: 1,
		maxRequests: 1,
	} as RouteHandlerOptions;

	public static base(ip: string) {
		return `https://${ip}:443/clip/v2`;
	}

	public static resource(type?: ApiResourceType) {
		return `/resource${type ? `/${type}` : ''}`;
	}

	public static device(id?: string) {
		return `${Routes.resource(ApiResourceType.Device)}${id ? `/${id}` : ''}`;
	}

	public static light(id?: string) {
		return `${Routes.resource(ApiResourceType.Light)}${id ? `/${id}` : ''}`;
	}

	public static groupedLight(id?: string) {
		return `${Routes.resource(ApiResourceType.GroupedLight)}${id ? `/${id}` : ''}`;
	}

	public static room(id?: string) {
		return `${Routes.resource(ApiResourceType.Room)}${id ? `/${id}` : ''}`;
	}

	public static zone(id?: string) {
		return `${Routes.resource(ApiResourceType.Zone)}${id ? `/${id}` : ''}`;
	}

	public static scene(id?: string) {
		return `${Routes.resource(ApiResourceType.Scene)}${id ? `/${id}` : ''}`;
	}

	public static eventStream(ip: string) {
		return `https://${ip}:443/eventstream/clip/v2`;
	}
}
