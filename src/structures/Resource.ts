import { Hue } from '../hue/Hue';
import { ResourceType, ResourceTypeGet } from '../api/ResourceType';
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
import { Manager } from '../managers/Manager';
import { ZigbeeConnectivity } from './ZigbeeConnectivity';
import { ZigbeeDeviceDiscovery } from './ZigbeeDeviceDiscovery';
import { Bridge } from './Bridge';
import { BridgeHome } from './BridgeHome';
import { Geolocation } from './Geolocation';

export interface Resources {
	[ResourceType.Device]: Device;
	[ResourceType.BridgeHome]: BridgeHome;
	[ResourceType.Room]: Room;
	[ResourceType.Zone]: Zone;
	[ResourceType.Light]: Light;
	[ResourceType.Button]: Resource<any>;
	[ResourceType.Temperature]: Resource<any>;
	[ResourceType.LightLevel]: Resource<any>;
	[ResourceType.Motion]: Motion;
	[ResourceType.Entertainment]: Resource<any>;
	[ResourceType.GroupedLight]: GroupedLight;
	[ResourceType.DevicePower]: DevicePower;
	[ResourceType.ZigbeeConnectivity]: ZigbeeConnectivity;
	[ResourceType.ZgpConnectivity]: Resource<any>;
	[ResourceType.ZigbeeDeviceDiscovery]: ZigbeeDeviceDiscovery;
	[ResourceType.Bridge]: Bridge;
	[ResourceType.Homekit]: Resource<any>;
	[ResourceType.Scene]: Scene;
	[ResourceType.EntertainmentConfiguration]: Resource<any>;
	[ResourceType.PublicImage]: Resource<any>;
	[ResourceType.BehaviourScript]: Resource<any>;
	[ResourceType.BehaviourInstance]: Resource<any>;
	[ResourceType.Geofence]: Resource<any>;
	[ResourceType.GeofenceClient]: Resource<any>;
	[ResourceType.Geolocation]: Geolocation;
}

export type NarrowResource<T extends ResourceType = ResourceType> = Resources[T];

export abstract class Resource<T extends ResourceType> {
	public readonly hue: Hue;
	public abstract readonly type: ResourceType;
	public abstract readonly manager: Manager<T>;
	public data: ResourceTypeGet<T>;

	get id(): string {
		return this.data.id;
	}

	get identifier(): ResourceIdentifier {
		return createResourceIdentifier(this.id, this.type);
	}

	constructor(hue: Hue, data: ResourceTypeGet<T>) {
		this.hue = hue;
		this.data = data;
	}

	public isType<T extends ResourceType>(type: T): this is NarrowResource<T> {
		return this.type === type;
	}

	public _patch(data: Partial<ResourceTypeGet<T>>) {
		this.data = merge<ResourceTypeGet<T>>(clone(this.data), data);
	}

	public _clone(): this {
		return clone(this);
	}

	public _update(data: Partial<ResourceTypeGet<T>>): this {
		const clone = this._clone();
		this._patch(data);
		return clone;
	}
}
