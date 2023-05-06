import { Bridge } from '../bridge/Bridge';
import { ApiResourceType, ApiResourceTypeGet, ApiResourceTypePut } from '../api/ApiResourceType';
import { Light } from './Light';
import { clone } from '../util/clone';
import { merge } from '../util/merge';
import { NamedResource } from './NamedResource';
import { ResourceIdentifier } from '../api/ResourceIdentifier';
import { createResourceIdentifier } from '../util/resourceIdentifier';
import { Scene } from './Scene';

export interface Resources {
	[ApiResourceType.Device]: never;
	[ApiResourceType.BridgeHome]: never;
	[ApiResourceType.Room]: never;
	[ApiResourceType.Zone]: never;
	[ApiResourceType.Light]: Light;
	[ApiResourceType.Button]: never;
	[ApiResourceType.Temperature]: never;
	[ApiResourceType.LightLevel]: never;
	[ApiResourceType.Motion]: never;
	[ApiResourceType.Entertainment]: never;
	[ApiResourceType.GroupedLight]: never;
	[ApiResourceType.DevicePower]: never;
	[ApiResourceType.ZigbeeBridgeConnectivity]: never;
	[ApiResourceType.ZgpConnectivity]: never;
	[ApiResourceType.Bridge]: never;
	[ApiResourceType.Homekit]: never;
	[ApiResourceType.Scene]: Scene;
	[ApiResourceType.EntertainmentConfiguration]: never;
	[ApiResourceType.PublicImage]: never;
	[ApiResourceType.BehaviourScript]: never;
	[ApiResourceType.BehaviourInstance]: never;
	[ApiResourceType.Geofence]: never;
	[ApiResourceType.GeofenceClient]: never;
	[ApiResourceType.Geolocation]: never;
}

export type NarrowResource<T extends ApiResourceType> = T extends ApiResourceType
	? Resources[T]
	: Resource<any> | NamedResource<any>;

export abstract class Resource<T extends ApiResourceType> {
	public readonly bridge: Bridge;
	public abstract readonly type: T;
	public data: ApiResourceTypeGet<T>;

	get id(): string {
		return this.data.id;
	}

	get identifier(): ResourceIdentifier<T> {
		return createResourceIdentifier<T>(this.id, this.type);
	}

	constructor(bridge: Bridge, data: ApiResourceTypeGet<T>) {
		this.bridge = bridge;
		this.data = data;
	}

	public isType<T extends ApiResourceType>(type: T): this is NarrowResource<T> {
		return this.type === type;
	}

	public _patch(data: Partial<ApiResourceTypeGet<T>>) {
		this.data = merge<ApiResourceTypeGet<T>>(clone(this.data), data);
	}

	public _clone(): this {
		return clone(this);
	}

	public _update(data: Partial<ApiResourceTypeGet<T>>): this {
		const clone = this._clone();
		this._patch(data);
		return clone;
	}

	protected async _put(data: ApiResourceTypePut<T>) {
		return this.bridge.rest.put(`/resource/${this.type}/${this.id}`, data);
	}
}
