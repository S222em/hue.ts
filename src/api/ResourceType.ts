import { LightGet } from './light/get';
import { LightPut } from './light/put';
import { SceneGet } from './scene/get';
import { ScenePut } from './scene/put';
import { ScenePost } from './scene/post';
import { RoomPost } from './room/post';
import { ZonePost } from './zone/post';
import { RoomPut } from './room/put';
import { ZonePut } from './zone/put';
import { RoomGet } from './room/get';
import { ZoneGet } from './zone/get';
import { DeviceGet } from './device/get';
import { DevicePut } from './device/put';
import { GroupedLightGet } from './grouped_light/get';
import { GroupedLightPut } from './grouped_light/put';
import { BridgeHomeGet } from './bridge_home/get';
import { DevicePowerGet } from './device_power/get';
import { MotionGet } from './motion/get';
import { MotionPut } from './motion/put';

export enum ResourceType {
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

export interface ResourceTypesGet {
	[ResourceType.Device]: DeviceGet;
	[ResourceType.BridgeHome]: BridgeHomeGet;
	[ResourceType.Room]: RoomGet;
	[ResourceType.Zone]: ZoneGet;
	[ResourceType.Light]: LightGet;
	[ResourceType.Button]: never;
	[ResourceType.Temperature]: never;
	[ResourceType.LightLevel]: never;
	[ResourceType.Motion]: MotionGet;
	[ResourceType.Entertainment]: never;
	[ResourceType.GroupedLight]: GroupedLightGet;
	[ResourceType.DevicePower]: DevicePowerGet;
	[ResourceType.ZigbeeBridgeConnectivity]: never;
	[ResourceType.ZgpConnectivity]: never;
	[ResourceType.Bridge]: never;
	[ResourceType.Homekit]: never;
	[ResourceType.Scene]: SceneGet;
	[ResourceType.EntertainmentConfiguration]: never;
	[ResourceType.PublicImage]: never;
	[ResourceType.BehaviourScript]: never;
	[ResourceType.BehaviourInstance]: never;
	[ResourceType.Geofence]: never;
	[ResourceType.GeofenceClient]: never;
	[ResourceType.Geolocation]: never;
}

export type ResourceTypeGet<T extends ResourceType> = ResourceTypesGet[T];

export interface ResourceTypesPut {
	[ResourceType.Device]: DevicePut;
	[ResourceType.BridgeHome]: never;
	[ResourceType.Room]: RoomPut;
	[ResourceType.Zone]: ZonePut;
	[ResourceType.Light]: LightPut;
	[ResourceType.Button]: never;
	[ResourceType.Temperature]: never;
	[ResourceType.LightLevel]: never;
	[ResourceType.Motion]: MotionPut;
	[ResourceType.Entertainment]: never;
	[ResourceType.GroupedLight]: GroupedLightPut;
	[ResourceType.DevicePower]: never;
	[ResourceType.ZigbeeBridgeConnectivity]: never;
	[ResourceType.ZgpConnectivity]: never;
	[ResourceType.Bridge]: never;
	[ResourceType.Homekit]: never;
	[ResourceType.Scene]: ScenePut;
	[ResourceType.EntertainmentConfiguration]: never;
	[ResourceType.PublicImage]: never;
	[ResourceType.BehaviourScript]: never;
	[ResourceType.BehaviourInstance]: never;
	[ResourceType.Geofence]: never;
	[ResourceType.GeofenceClient]: never;
	[ResourceType.Geolocation]: never;
}

export type ResourceTypePut<T extends ResourceType> = ResourceTypesPut[T];

export interface ResourceTypesPost {
	[ResourceType.Device]: never;
	[ResourceType.BridgeHome]: never;
	[ResourceType.Room]: RoomPost;
	[ResourceType.Zone]: ZonePost;
	[ResourceType.Light]: never;
	[ResourceType.Button]: never;
	[ResourceType.Temperature]: never;
	[ResourceType.LightLevel]: never;
	[ResourceType.Motion]: never;
	[ResourceType.Entertainment]: never;
	[ResourceType.GroupedLight]: never;
	[ResourceType.DevicePower]: never;
	[ResourceType.ZigbeeBridgeConnectivity]: never;
	[ResourceType.ZgpConnectivity]: never;
	[ResourceType.Bridge]: never;
	[ResourceType.Homekit]: never;
	[ResourceType.Scene]: ScenePost;
	[ResourceType.EntertainmentConfiguration]: never;
	[ResourceType.PublicImage]: never;
	[ResourceType.BehaviourScript]: never;
	[ResourceType.BehaviourInstance]: never;
	[ResourceType.Geofence]: never;
	[ResourceType.GeofenceClient]: never;
	[ResourceType.Geolocation]: never;
}

export type ResourceTypePost<T extends ResourceType> = ResourceTypesPost[T];
