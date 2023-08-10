import { APIResourceType } from './ResourceType';
import { APIDevice } from './Device';
import { APIBridgeHome } from './BridgeHome';
import { APIRoom } from './Room';
import { APIZone } from './Zone';
import { APILight } from './Light';
import { APIMotion } from './Motion';
import { APIGroupedLight } from './GroupedLight';
import { APIDevicePower } from './DevicePower';
import { APIZigbeeConnectivity } from './ZigbeeConnectivity';
import { APIZigbeeDeviceDiscovery } from './ZigbeeDeviceDiscovery';
import { APIBridge } from './Bridge';
import { APIScene } from './Scene';
import { APIGeolocation } from './Geolocation';

interface APIPossibleResource {
	[APIResourceType.Device]: APIDevice;
	[APIResourceType.BridgeHome]: APIBridgeHome;
	[APIResourceType.Room]: APIRoom;
	[APIResourceType.Zone]: APIZone;
	[APIResourceType.Light]: APILight;
	[APIResourceType.Button]: never;
	[APIResourceType.Temperature]: never;
	[APIResourceType.LightLevel]: never;
	[APIResourceType.Motion]: APIMotion;
	[APIResourceType.Entertainment]: never;
	[APIResourceType.GroupedLight]: APIGroupedLight;
	[APIResourceType.DevicePower]: APIDevicePower;
	[APIResourceType.ZigbeeConnectivity]: APIZigbeeConnectivity;
	[APIResourceType.ZgpConnectivity]: never;
	[APIResourceType.ZigbeeDeviceDiscovery]: APIZigbeeDeviceDiscovery;
	[APIResourceType.Bridge]: APIBridge;
	[APIResourceType.Homekit]: never;
	[APIResourceType.Scene]: APIScene;
	[APIResourceType.EntertainmentConfiguration]: never;
	[APIResourceType.PublicImage]: never;
	[APIResourceType.BehaviourScript]: never;
	[APIResourceType.BehaviourInstance]: never;
	[APIResourceType.Geofence]: never;
	[APIResourceType.GeofenceClient]: never;
	[APIResourceType.Geolocation]: APIGeolocation;
}

export type APIResource<TAPIResourceType extends APIResourceType> = APIPossibleResource[TAPIResourceType];
