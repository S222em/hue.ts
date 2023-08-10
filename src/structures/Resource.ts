import { Hue } from '../hue/Hue';
import { APIResourceType } from '../api/ResourceType';
import { Light } from './Light';
import { clone } from '../util/clone';
import { merge } from '../util/merge';
import { APIResourceIdentifier } from '../api/ResourceIdentifier';
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
import { Base } from './Base';
import { APIResource } from '../api/Resource';
import { SSEUpdateData } from '../api/Update';

export interface PossibleResources {
	[APIResourceType.Device]: Device;
	[APIResourceType.BridgeHome]: BridgeHome;
	[APIResourceType.Room]: Room;
	[APIResourceType.Zone]: Zone;
	[APIResourceType.Light]: Light;
	[APIResourceType.Button]: Resource<any>;
	[APIResourceType.Temperature]: Resource<any>;
	[APIResourceType.LightLevel]: Resource<any>;
	[APIResourceType.Motion]: Motion;
	[APIResourceType.Entertainment]: Resource<any>;
	[APIResourceType.GroupedLight]: GroupedLight;
	[APIResourceType.DevicePower]: DevicePower;
	[APIResourceType.ZigbeeConnectivity]: ZigbeeConnectivity;
	[APIResourceType.ZgpConnectivity]: Resource<any>;
	[APIResourceType.ZigbeeDeviceDiscovery]: ZigbeeDeviceDiscovery;
	[APIResourceType.Bridge]: Bridge;
	[APIResourceType.Homekit]: Resource<any>;
	[APIResourceType.Scene]: Scene;
	[APIResourceType.EntertainmentConfiguration]: Resource<any>;
	[APIResourceType.PublicImage]: Resource<any>;
	[APIResourceType.BehaviourScript]: Resource<any>;
	[APIResourceType.BehaviourInstance]: Resource<any>;
	[APIResourceType.Geofence]: Resource<any>;
	[APIResourceType.GeofenceClient]: Resource<any>;
	[APIResourceType.Geolocation]: Geolocation;
}

export type NarrowResource<T extends APIResourceType = APIResourceType> = PossibleResources[T];

export abstract class Resource<TAPIResourceType extends APIResourceType> extends Base {
	public abstract readonly type: APIResourceType;
	public abstract readonly manager: Manager<TAPIResourceType>;
	public data: APIResource<TAPIResourceType>;

	get id(): string {
		return this.data.id;
	}

	get identifier(): APIResourceIdentifier {
		return createResourceIdentifier(this.id, this.type);
	}

	constructor(hue: Hue, data: APIResource<TAPIResourceType>) {
		super(hue);
		this.data = data;
	}

	public _patch(data: SSEUpdateData<TAPIResourceType>) {
		this.data = merge<APIResource<TAPIResourceType>>(clone(this.data), data);
	}

	public _clone(): this {
		return clone(this);
	}

	public _update(data: SSEUpdateData<TAPIResourceType>): this {
		const clone = this._clone();
		this._patch(data);
		return clone;
	}
}
