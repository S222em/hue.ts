import { Bridge } from '../bridge/Bridge';
import Collection from '@discordjs/collection';
import { NarrowResource, Resource } from '../structures/Resource';
import { ApiResourceType, ApiResourceTypeGet } from '../api/ApiResourceType';
import { Light, LightCapabilities, NarrowLight } from '../structures/Light';
import { XyLight } from '../structures/XyLight';
import { MirekLight } from '../structures/MirekLight';
import { DimmableLight } from '../structures/DimmableLight';
import { Scene } from '../structures/Scene';
import { XysLight } from '../structures/XysLight';
import { ResourceIdentifier } from '../api/ResourceIdentifier';

export const RESOURCES = {
	[ApiResourceType.Light]: {
		[LightCapabilities.None]: Light,
		[LightCapabilities.Dimming]: DimmableLight,
		[LightCapabilities.Mirek]: MirekLight,
		[LightCapabilities.Xy]: XyLight,
		[LightCapabilities.Xys]: XysLight,
	},
	[ApiResourceType.Device]: undefined,
	[ApiResourceType.BridgeHome]: undefined,
	[ApiResourceType.Room]: undefined,
	[ApiResourceType.Zone]: undefined,
	[ApiResourceType.Button]: undefined,
	[ApiResourceType.Temperature]: undefined,
	[ApiResourceType.LightLevel]: undefined,
	[ApiResourceType.Motion]: undefined,
	[ApiResourceType.Entertainment]: undefined,
	[ApiResourceType.GroupedLight]: undefined,
	[ApiResourceType.DevicePower]: undefined,
	[ApiResourceType.ZigbeeBridgeConnectivity]: undefined,
	[ApiResourceType.ZgpConnectivity]: undefined,
	[ApiResourceType.Bridge]: undefined,
	[ApiResourceType.Homekit]: undefined,
	[ApiResourceType.Scene]: Scene,
	[ApiResourceType.EntertainmentConfiguration]: undefined,
	[ApiResourceType.PublicImage]: undefined,
	[ApiResourceType.BehaviourScript]: undefined,
	[ApiResourceType.BehaviourInstance]: undefined,
	[ApiResourceType.Geofence]: undefined,
	[ApiResourceType.GeofenceClient]: undefined,
	[ApiResourceType.Geolocation]: undefined,
};

export type Resolvable<T extends ApiResourceType = ApiResourceType> =
	| NarrowResource<T>
	| string
	| ResourceIdentifier<T>;

export interface ResolveOptions<
	T extends ApiResourceType = ApiResourceType,
	L extends LightCapabilities | undefined = undefined,
> {
	type?: T;
	light?: {
		capableOf?: L;
	};
	force?: boolean;
}

export type Resolved<T extends ApiResourceType, L extends LightCapabilities> = T extends ApiResourceType.Light
	? NarrowLight<L>
	: NarrowResource<T>;

export class ResourceManager {
	public readonly bridge: Bridge;
	public readonly cache = new Collection<string, NarrowResource<any>>();

	constructor(bridge: Bridge) {
		this.bridge = bridge;
	}

	public resolve<T extends ApiResourceType, L extends LightCapabilities>(
		resolvable: Resolvable,
		options?: ResolveOptions<T, L> & { force: true },
	): Resolved<T, L>;
	public resolve<T extends ApiResourceType, L extends LightCapabilities>(
		resolvable: Resolvable,
		options?: ResolveOptions<T, L>,
	): Resolved<T, L> | undefined;
	public resolve(resolvable: any, options: any): any {
		let resource: Resource<any>;

		if (resolvable instanceof Resource) resource = this.cache.get(resolvable.id);
		else if (this.cache.has(resolvable)) resource = this.cache.get(resolvable);
		else resource = this.cache.find((resource) => 'name' in resource && resource.name === resolvable);

		if (!resource && options?.force) throw new Error('Could not find resource');
		else if (!resource) return;

		if (options?.type && !resource.isType(options?.type)) {
			if (options?.force) throw new Error('Resource does not meet type constraint');
			else return;
		}

		if (
			options?.light?.capableOf &&
			resource.isType(ApiResourceType.Light) &&
			!resource.isCapableOf(options.light.capableOf)
		) {
			if (options?.force) throw new Error('Resource does not meet light capability constraint');
			else return;
		}

		return resource;
	}

	public resolveId(resolvable: Resolvable, options?: ResolveOptions & { force: true }): string;
	public resolveId(resolvable: Resolvable, options?: ResolveOptions): string | undefined;
	public resolveId(resolvable: any, options?: any): any {
		return this.resolve(resolvable, options)?.id;
	}

	public _create(data: ApiResourceTypeGet<any>): NarrowResource<any> | undefined {
		const resourceClass = this._resolveResource(data);
		if (!resourceClass) return;

		const resource = new resourceClass(this.bridge, data);
		this.cache.set(resource.id, resource);

		return resource;
	}

	private _resolveResource<T extends ApiResourceType>(
		data: ApiResourceTypeGet<T>,
	): (new (bridge: Bridge, data: any) => NarrowResource<any>) | undefined {
		if (data.type && data.type === ApiResourceType.Light)
			return RESOURCES[ApiResourceType.Light][this._resolveLightCapabilities(data)];
		else if (data.type) return RESOURCES[data.type];
	}

	private _resolveLightCapabilities(data: ApiResourceTypeGet<ApiResourceType.Light>): LightCapabilities {
		if (data.gradient) return LightCapabilities.Xys;
		if (data.color) return LightCapabilities.Xy;
		if (data.color_temperature) return LightCapabilities.Mirek;
		if (data.dimming) return LightCapabilities.Dimming;

		return LightCapabilities.None;
	}
}
