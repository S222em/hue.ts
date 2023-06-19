import { Bridge } from '../bridge/Bridge';
import { Collection } from '@discordjs/collection';
import { NarrowResource } from '../structures/Resource';
import { ApiResourceType, ApiResourceTypeGet } from '../api/ApiResourceType';
import { Light, LightCapabilities, NarrowLight } from '../structures/Light';
import { XyLight } from '../structures/XyLight';
import { MirekLight } from '../structures/MirekLight';
import { DimmableLight } from '../structures/DimmableLight';
import { Scene } from '../structures/Scene';
import { XysLight } from '../structures/XysLight';
import { ResourceIdentifier } from '../api/ResourceIdentifier';
import { Room } from '../structures/Room';
import { Zone } from '../structures/Zone';
import { Device } from '../structures/Device';
import { GroupedLight } from '../structures/GroupedLight';
import { BridgeHome } from '../structures/BridgeHome';
import { DevicePower } from '../structures/DevicePower';

export const RESOURCES = {
	[ApiResourceType.Light]: {
		[LightCapabilities.None]: Light,
		[LightCapabilities.Dimming]: DimmableLight,
		[LightCapabilities.Mirek]: MirekLight,
		[LightCapabilities.Xy]: XyLight,
		[LightCapabilities.Xys]: XysLight,
	},
	[ApiResourceType.Device]: Device,
	[ApiResourceType.BridgeHome]: BridgeHome,
	[ApiResourceType.Room]: Room,
	[ApiResourceType.Zone]: Zone,
	[ApiResourceType.Button]: undefined,
	[ApiResourceType.Temperature]: undefined,
	[ApiResourceType.LightLevel]: undefined,
	[ApiResourceType.Motion]: undefined,
	[ApiResourceType.Entertainment]: undefined,
	[ApiResourceType.GroupedLight]: GroupedLight,
	[ApiResourceType.DevicePower]: DevicePower,
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

export type Resolved<T extends ApiResourceType, L extends LightCapabilities> = T extends ApiResourceType.Light
	? NarrowLight<L>
	: NarrowResource<T>;

export class ResourceManager {
	public readonly bridge: Bridge;
	public readonly cache = new Collection<string, NarrowResource>();

	constructor(bridge: Bridge) {
		this.bridge = bridge;
	}

	getById<T extends ApiResourceType>(id?: string, options?: { force: true; type?: T }): NarrowResource<T>;
	getById<T extends ApiResourceType>(
		id?: string,
		options?: { force?: boolean; type?: T },
	): NarrowResource<T> | undefined;
	public getById<T extends ApiResourceType>(id?: string, options: { force?: boolean; type?: T } = {}) {
		const resource = this.cache.get(id ?? '');

		if (!resource && options.force) throw new Error(`Nonexistent ${options.type ?? 'unknown type'}: ${id}`);
		if (resource && resource.type !== options.type)
			throw new Error(`${resource.type}: ${id} rtype mismatch (requested: ${options.type}, actual: ${options.type})`);

		return resource;
	}

	getByIdentifier<T extends ApiResourceType, U extends ApiResourceType>(
		identifier?: ResourceIdentifier<T>,
		options?: { force: true; type?: U },
	): NarrowResource<U extends ApiResourceType ? U : T>;
	getByIdentifier<T extends ApiResourceType, U extends ApiResourceType>(
		identifier?: ResourceIdentifier<T>,
		options?: { force?: boolean; type?: U },
	): NarrowResource<U extends ApiResourceType ? U : T> | undefined;
	public getByIdentifier<T extends ApiResourceType, U extends ApiResourceType>(
		identifier?: ResourceIdentifier<T>,
		options: { force?: boolean; type?: U } = {},
	) {
		return this.getById(identifier?.rid, { type: options.type ?? identifier?.rtype, force: options.force });
	}

	public getByIdentifiers(identifiers: ResourceIdentifier[], type?: ApiResourceType): NarrowResource[] {
		return identifiers
			.map((identifier) => this.getByIdentifier(identifier, { type }))
			.filter((resource) => resource !== null && resource !== undefined) as NarrowResource[];
	}

	getByName<T extends ApiResourceType>(name?: string, options?: { force: true; type?: T }): NarrowResource<T>;
	getByName<T extends ApiResourceType>(
		name?: string,
		options?: { force?: boolean; type?: T },
	): NarrowResource<T> | undefined;
	public getByName<T extends ApiResourceType>(name?: string, options: { force?: boolean; type?: T } = {}) {
		const resource = this.cache.find(
			(resource) => 'name' in resource && resource.name === name && resource.type === options.type,
		);

		if (!resource && options.force) throw new Error(`Nonexistent ${name}`);

		return resource;
	}

	getIdentifierByName<T extends ApiResourceType>(
		name?: string,
		options?: { force: true; type?: T },
	): ResourceIdentifier<T>;
	getIdentifierByName<T extends ApiResourceType>(
		name?: string,
		options?: { force?: boolean; type?: T },
	): ResourceIdentifier<T> | undefined;
	public getIdentifierByName<T extends ApiResourceType>(name?: string, options: { force?: boolean; type?: T } = {}) {
		const resource = this.getByName(name, options);

		return resource?.identifier as ResourceIdentifier;
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
