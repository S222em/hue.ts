import { RouteHandlerOptions } from '../bridge/rest/RouteRateLimit';

export class Routes {
	public static resourceRateLimit = {
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

	public static resource(type?: 'light' | 'grouped_light' | 'room' | 'zone' | 'scene') {
		return `/resource${type ? `/${type}` : ''}`;
	}

	public static light(id?: string) {
		return `${Routes.resource('light')}${id ? `/${id}` : ''}`;
	}

	public static groupedLight(id?: string) {
		return `${Routes.resource('grouped_light')}${id ? `/${id}` : ''}`;
	}

	public static room(id?: string) {
		return `${Routes.resource('room')}${id ? `/${id}` : ''}`;
	}

	public static zone(id?: string) {
		return `${Routes.resource('zone')}${id ? `/${id}` : ''}`;
	}

	public static scene(id?: string) {
		return `${Routes.resource('scene')}${id ? `/${id}` : ''}`;
	}

	public static eventStream(ip: string) {
		return `https://${ip}:443/eventstream/clip/v2`;
	}
}
