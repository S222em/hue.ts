import { DeviceGet } from './get/DeviceGet';
import { BridgeHomeGet } from './get/BridgeHomeGet';
import { RoomGet } from './get/RoomGet';
import { ZoneGet } from './get/ZoneGet';
import { LightGet } from './get/LightGet';
import { MotionGet } from './get/MotionGet';
import { GroupedLightGet } from './get/GroupedLightGet';
import { DevicePowerGet } from './get/DevicePowerGet';
import { SceneGet } from './get/SceneGet';
import { DevicePut } from './put/DevicePut';
import { RoomPut } from './put/RoomPut';
import { ZonePut } from './put/ZonePut';
import { LightPut } from './put/LightPut';
import { MotionPut } from './put/MotionPut';
import { GroupedLightPut } from './put/GroupedLightPut';
import { ScenePut } from './put/ScenePut';
import { RoomPost } from './post/RoomPost';
import { ZonePost } from './post/ZonePost';
import { ScenePost } from './post/ScenePost';
import { ZigbeeConnectivityGet } from './get/ZigbeeConnectivityGet';

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
	ZigbeeConnectivity = 'zigbee_connectivity',
	ZgpConnectivity = 'zgp_connectivity',
	ZigbeeDeviceDiscovery = 'zigbee_device_discovery',
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
	[ResourceType.ZigbeeConnectivity]: ZigbeeConnectivityGet;
	[ResourceType.ZgpConnectivity]: never;
	[ResourceType.ZigbeeDeviceDiscovery]: never;
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
	[ResourceType.ZigbeeConnectivity]: never;
	[ResourceType.ZgpConnectivity]: never;
	[ResourceType.ZigbeeDeviceDiscovery]: never;
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
	[ResourceType.ZigbeeConnectivity]: never;
	[ResourceType.ZgpConnectivity]: never;
	[ResourceType.ZigbeeDeviceDiscovery]: never;
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
