import { APIResourceType } from './ResourceType';
import { SSERoomUpdateData } from './Room';
import { SSEZoneUpdateData } from './Zone';
import { SSESceneUpdateData } from './Scene';
import { SSEDeviceUpdateData } from './Device';
import { SSEBridgeHomeUpdateData } from './BridgeHome';
import { SSELightUpdateData } from './Light';
import { SSEMotionUpdateData } from './Motion';
import { SSEGroupedLightUpdateData } from './GroupedLight';
import { SSEDevicePowerUpdateData } from './DevicePower';
import { SSEZigbeeConnectivityUpdateData } from './ZigbeeConnectivity';
import { SSEZigbeeDeviceDiscoveryUpdateData } from './ZigbeeDeviceDiscovery';
import { SSEGeolocationUpdateData } from './Geolocation';
import { SSEBridgeUpdateData } from './Bridge';

export type MakeSSEUpdateData<TAPIResource extends Record<string, any>> = Partial<TAPIResource> &
	Pick<TAPIResource, 'type' | 'id'>;

export interface SSEPossibleUpdateData {
	[APIResourceType.Device]: SSEDeviceUpdateData;
	[APIResourceType.BridgeHome]: SSEBridgeHomeUpdateData;
	[APIResourceType.Room]: SSERoomUpdateData;
	[APIResourceType.Zone]: SSEZoneUpdateData;
	[APIResourceType.Light]: SSELightUpdateData;
	[APIResourceType.Button]: never;
	[APIResourceType.Temperature]: never;
	[APIResourceType.LightLevel]: never;
	[APIResourceType.Motion]: SSEMotionUpdateData;
	[APIResourceType.Entertainment]: never;
	[APIResourceType.GroupedLight]: SSEGroupedLightUpdateData;
	[APIResourceType.DevicePower]: SSEDevicePowerUpdateData;
	[APIResourceType.ZigbeeConnectivity]: SSEZigbeeConnectivityUpdateData;
	[APIResourceType.ZgpConnectivity]: never;
	[APIResourceType.ZigbeeDeviceDiscovery]: SSEZigbeeDeviceDiscoveryUpdateData;
	[APIResourceType.Bridge]: SSEBridgeUpdateData;
	[APIResourceType.Homekit]: never;
	[APIResourceType.Scene]: SSESceneUpdateData;
	[APIResourceType.EntertainmentConfiguration]: never;
	[APIResourceType.PublicImage]: never;
	[APIResourceType.BehaviourScript]: never;
	[APIResourceType.BehaviourInstance]: never;
	[APIResourceType.Geofence]: never;
	[APIResourceType.GeofenceClient]: never;
	[APIResourceType.Geolocation]: SSEGeolocationUpdateData;
}

export type SSEUpdateData<TAPIResourceType extends APIResourceType> = SSEPossibleUpdateData[TAPIResourceType];
