import { ApiLightGet } from './light/get';
import { ApiLightPut } from './light/put';
import { ApiSceneGet } from './scene/get';
import { ApiScenePut } from './scene/put';
import { ApiScenePost } from './scene/post';
import { ApiRoomPost } from './room/post';
import { ApiZonePost } from './zone/post';
import { ApiRoomPut } from './room/put';
import { ApiZonePut } from './zone/put';
import { ApiRoomGet } from './room/get';
import { ApiZoneGet } from './zone/get';
import { ApiDeviceGet } from './device/get';
import { ApiDevicePut } from './device/put';
import { ApiGroupedLightGet } from './grouped_light/get';
import { ApiGroupedLightPut } from './grouped_light/put';
import { ApiBridgeHomeGet } from './bridge_home/get';
import { ApiDevicePowerGet } from './device_power/get';
import { ApiMotionGet } from './motion/get';
import { ApiMotionPut } from './motion/put';

export enum ApiResourceType {
	Device = 'device',
	BridgeHome = 'bridge_home',
	Room = 'room',
	Zone = 'zone',
	Light = 'light',
	Button = 'button',
	Temperature = 'temperature',
	LightLevel = 'light_level',
	Motion = 'motion',
	Entertainment = 'entertainment',
	GroupedLight = 'grouped_light',
	DevicePower = 'device_power',
	ZigbeeBridgeConnectivity = 'zigbee_bridge_connectivity',
	ZgpConnectivity = 'zgp_connectivity',
	Bridge = 'bridge',
	Homekit = 'homekit',
	Scene = 'scene',
	EntertainmentConfiguration = 'entertainment_configuration',
	PublicImage = 'public_image',
	BehaviourScript = 'behaviour_script',
	BehaviourInstance = 'behaviour_instance',
	Geofence = 'geofence',
	GeofenceClient = 'geofence_client',
	Geolocation = 'geolocation',
}

export interface ApiResourceTypesGet {
	[ApiResourceType.Device]: ApiDeviceGet;
	[ApiResourceType.BridgeHome]: ApiBridgeHomeGet;
	[ApiResourceType.Room]: ApiRoomGet;
	[ApiResourceType.Zone]: ApiZoneGet;
	[ApiResourceType.Light]: ApiLightGet;
	[ApiResourceType.Button]: never;
	[ApiResourceType.Temperature]: never;
	[ApiResourceType.LightLevel]: never;
	[ApiResourceType.Motion]: ApiMotionGet;
	[ApiResourceType.Entertainment]: never;
	[ApiResourceType.GroupedLight]: ApiGroupedLightGet;
	[ApiResourceType.DevicePower]: ApiDevicePowerGet;
	[ApiResourceType.ZigbeeBridgeConnectivity]: never;
	[ApiResourceType.ZgpConnectivity]: never;
	[ApiResourceType.Bridge]: never;
	[ApiResourceType.Homekit]: never;
	[ApiResourceType.Scene]: ApiSceneGet;
	[ApiResourceType.EntertainmentConfiguration]: never;
	[ApiResourceType.PublicImage]: never;
	[ApiResourceType.BehaviourScript]: never;
	[ApiResourceType.BehaviourInstance]: never;
	[ApiResourceType.Geofence]: never;
	[ApiResourceType.GeofenceClient]: never;
	[ApiResourceType.Geolocation]: never;
}

export type ApiResourceTypeGet<T extends ApiResourceType> = ApiResourceTypesGet[T];

export interface ApiResourceTypesPut {
	[ApiResourceType.Device]: ApiDevicePut;
	[ApiResourceType.BridgeHome]: never;
	[ApiResourceType.Room]: ApiRoomPut;
	[ApiResourceType.Zone]: ApiZonePut;
	[ApiResourceType.Light]: ApiLightPut;
	[ApiResourceType.Button]: never;
	[ApiResourceType.Temperature]: never;
	[ApiResourceType.LightLevel]: never;
	[ApiResourceType.Motion]: ApiMotionPut;
	[ApiResourceType.Entertainment]: never;
	[ApiResourceType.GroupedLight]: ApiGroupedLightPut;
	[ApiResourceType.DevicePower]: never;
	[ApiResourceType.ZigbeeBridgeConnectivity]: never;
	[ApiResourceType.ZgpConnectivity]: never;
	[ApiResourceType.Bridge]: never;
	[ApiResourceType.Homekit]: never;
	[ApiResourceType.Scene]: ApiScenePut;
	[ApiResourceType.EntertainmentConfiguration]: never;
	[ApiResourceType.PublicImage]: never;
	[ApiResourceType.BehaviourScript]: never;
	[ApiResourceType.BehaviourInstance]: never;
	[ApiResourceType.Geofence]: never;
	[ApiResourceType.GeofenceClient]: never;
	[ApiResourceType.Geolocation]: never;
}

export type ApiResourceTypePut<T extends ApiResourceType> = ApiResourceTypesPut[T];

export interface ApiResourceTypesPost {
	[ApiResourceType.Device]: never;
	[ApiResourceType.BridgeHome]: never;
	[ApiResourceType.Room]: ApiRoomPost;
	[ApiResourceType.Zone]: ApiZonePost;
	[ApiResourceType.Light]: never;
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
	[ApiResourceType.Scene]: ApiScenePost;
	[ApiResourceType.EntertainmentConfiguration]: never;
	[ApiResourceType.PublicImage]: never;
	[ApiResourceType.BehaviourScript]: never;
	[ApiResourceType.BehaviourInstance]: never;
	[ApiResourceType.Geofence]: never;
	[ApiResourceType.GeofenceClient]: never;
	[ApiResourceType.Geolocation]: never;
}

export type ApiResourceTypePost<T extends ApiResourceType> = ApiResourceTypesPost[T];
