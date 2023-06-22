import { Bridge } from '../bridge/Bridge';
import { ApiResourceType, ApiResourceTypeGet, ApiResourceTypePut } from '../api/ApiResourceType';
import { Light } from './Light';
import { clone } from '../util/clone';
import { merge } from '../util/merge';
import { ResourceIdentifier } from '../api/ResourceIdentifier';
import { createResourceIdentifier } from '../util/resourceIdentifier';
import { Scene } from './Scene';
import { Room } from './Room';
import { Zone } from './Zone';
import { Device } from './Device';
import { GroupedLight } from './GroupedLight';
import { DevicePower } from './DevicePower';
import { Motion } from './Motion';

export interface Resources {
	[ApiResourceType.Device]: Device;
	[ApiResourceType.BridgeHome]: Resource<any>;
	[ApiResourceType.Room]: Room;
	[ApiResourceType.Zone]: Zone;
	[ApiResourceType.Light]: Light;
	[ApiResourceType.Button]: Resource<any>;
	[ApiResourceType.Temperature]: Resource<any>;
	[ApiResourceType.LightLevel]: Resource<any>;
	[ApiResourceType.Motion]: Motion;
	[ApiResourceType.Entertainment]: Resource<any>;
	[ApiResourceType.GroupedLight]: GroupedLight;
	[ApiResourceType.DevicePower]: DevicePower;
	[ApiResourceType.ZigbeeBridgeConnectivity]: Resource<any>;
	[ApiResourceType.ZgpConnectivity]: Resource<any>;
	[ApiResourceType.Bridge]: Resource<any>;
	[ApiResourceType.Homekit]: Resource<any>;
	[ApiResourceType.Scene]: Scene;
	[ApiResourceType.EntertainmentConfiguration]: Resource<any>;
	[ApiResourceType.PublicImage]: Resource<any>;
	[ApiResourceType.BehaviourScript]: Resource<any>;
	[ApiResourceType.BehaviourInstance]: Resource<any>;
	[ApiResourceType.Geofence]: Resource<any>;
	[ApiResourceType.GeofenceClient]: Resource<any>;
	[ApiResourceType.Geolocation]: Resource<any>;
}

export type NarrowResource<T extends ApiResourceType = ApiResourceType> = Resources[T];

export abstract class Resource<T extends ApiResourceType> {
	public readonly bridge: Bridge;
	public abstract readonly type: ApiResourceType;
	public data: ApiResourceTypeGet<T>;

	get id(): string {
		return this.data.id;
	}

	get identifier(): ResourceIdentifier {
		return createResourceIdentifier(this.id, this.type);
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

	protected async _put(data: ApiResourceTypePut<T>): Promise<void> {
		await this.bridge.rest.put(`/resource/${this.type}/${this.id}`, data);
	}
}
