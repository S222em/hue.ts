import { APIResourceType } from './ResourceType';
import { RESTDevicePutPayload } from './Device';
import { RESTRoomPostPayload, RESTRoomPutPayload } from './Room';
import { RESTZonePostPayload, RESTZonePutPayload } from './Zone';
import { RESTLightPutPayload } from './Light';
import { RESTMotionPutPayload } from './Motion';
import { RESTGroupedLightPutPayload } from './GroupedLight';
import { RESTZigbeeDeviceDiscoveryPutPayload } from './ZigbeeDeviceDiscovery';
import { RESTScenePostPayload, RESTScenePutPayload } from './Scene';
import { RESTGeolocationPutPayload } from './Geolocation';

interface RESTPutPayloads {
	[APIResourceType.Device]: RESTDevicePutPayload;
	[APIResourceType.BridgeHome]: never;
	[APIResourceType.Room]: RESTRoomPutPayload;
	[APIResourceType.Zone]: RESTZonePutPayload;
	[APIResourceType.Light]: RESTLightPutPayload;
	[APIResourceType.Button]: never;
	[APIResourceType.Temperature]: never;
	[APIResourceType.LightLevel]: never;
	[APIResourceType.Motion]: RESTMotionPutPayload;
	[APIResourceType.Entertainment]: never;
	[APIResourceType.GroupedLight]: RESTGroupedLightPutPayload;
	[APIResourceType.DevicePower]: never;
	[APIResourceType.ZigbeeConnectivity]: never;
	[APIResourceType.ZgpConnectivity]: never;
	[APIResourceType.ZigbeeDeviceDiscovery]: RESTZigbeeDeviceDiscoveryPutPayload;
	[APIResourceType.Bridge]: never;
	[APIResourceType.Homekit]: never;
	[APIResourceType.Scene]: RESTScenePutPayload;
	[APIResourceType.EntertainmentConfiguration]: never;
	[APIResourceType.PublicImage]: never;
	[APIResourceType.BehaviourScript]: never;
	[APIResourceType.BehaviourInstance]: never;
	[APIResourceType.Geofence]: never;
	[APIResourceType.GeofenceClient]: never;
	[APIResourceType.Geolocation]: RESTGeolocationPutPayload;
}

export type RESTPutPayload<TAPIResourceType extends APIResourceType> = RESTPutPayloads[TAPIResourceType];

interface RESTPostPayloads {
	[APIResourceType.Device]: never;
	[APIResourceType.BridgeHome]: never;
	[APIResourceType.Room]: RESTRoomPostPayload;
	[APIResourceType.Zone]: RESTZonePostPayload;
	[APIResourceType.Light]: never;
	[APIResourceType.Button]: never;
	[APIResourceType.Temperature]: never;
	[APIResourceType.LightLevel]: never;
	[APIResourceType.Motion]: never;
	[APIResourceType.Entertainment]: never;
	[APIResourceType.GroupedLight]: never;
	[APIResourceType.DevicePower]: never;
	[APIResourceType.ZigbeeConnectivity]: never;
	[APIResourceType.ZgpConnectivity]: never;
	[APIResourceType.ZigbeeDeviceDiscovery]: never;
	[APIResourceType.Bridge]: never;
	[APIResourceType.Homekit]: never;
	[APIResourceType.Scene]: RESTScenePostPayload;
	[APIResourceType.EntertainmentConfiguration]: never;
	[APIResourceType.PublicImage]: never;
	[APIResourceType.BehaviourScript]: never;
	[APIResourceType.BehaviourInstance]: never;
	[APIResourceType.Geofence]: never;
	[APIResourceType.GeofenceClient]: never;
	[APIResourceType.Geolocation]: never;
}

export type RESTPostPayload<TAPIResourceType extends APIResourceType> = RESTPostPayloads[TAPIResourceType];
