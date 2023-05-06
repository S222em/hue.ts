import { ApiResourceType } from '../types/api/common';
import { Data } from './Data';
import { Device } from './Device';
import { GroupedLight } from './GroupedLight';
import { Room } from './Room';
import { Zone } from './Zone';
import { Scene } from './Scene';
import { NormalLight } from './NormalLight';

export interface Resources {
	[ApiResourceType.Device]: Device;
	[ApiResourceType.BridgeHome]: never;
	[ApiResourceType.Room]: Room;
	[ApiResourceType.Zone]: Zone;
	[ApiResourceType.Light]: NormalLight;
	[ApiResourceType.Button]: never;
	[ApiResourceType.Temperature]: never;
	[ApiResourceType.LightLevel]: never;
	[ApiResourceType.Motion]: never;
	[ApiResourceType.Entertainment]: never;
	[ApiResourceType.GroupedLight]: GroupedLight;
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

export type NarrowResource<T extends ApiResourceType | ApiResourceType[]> = T extends (infer U)[]
	? Resources[U]
	: T extends ApiResourceType
	? Resources[T]
	: Resource<any>;

/**
 * Base for all resources
 */
export abstract class Resource<R extends object & { id?: string }> extends Data<R> {
	/**
	 * The type of this resource
	 */
	public type: ApiResourceType;

	/**
	 * The ID of this resource
	 */
	get id(): string {
		return this.data.id;
	}

	public isDevice(): this is Device {
		return this._isType(ApiResourceType.Device);
	}

	public isLight(): this is NormalLight {
		return this._isType(ApiResourceType.Device);
	}

	public isGroupedLight(): this is GroupedLight {
		return this._isType(ApiResourceType.Device);
	}

	public isScene(): this is Scene {
		return this._isType(ApiResourceType.Device);
	}

	public isRoom(): this is Room {
		return this._isType(ApiResourceType.Device);
	}

	public isZone(): this is Zone {
		return this._isType(ApiResourceType.Device);
	}

	public _isType(type: ApiResourceType): boolean {
		return this.type === type;
	}

	public abstract fetch(): Promise<Resource<any>>;

	protected abstract _edit(options: R): Promise<void>;
}
