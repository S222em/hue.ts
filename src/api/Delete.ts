import { APIResourceType } from './ResourceType';
import { SSERoomDeleteData } from './Room';
import { SSEZoneDeleteData } from './Zone';
import { SSESceneDeleteData } from './Scene';
import { SSEDeviceDeleteData } from './Device';
import { SSEBridgeHomeDeleteData } from './BridgeHome';
import { SSELightDeleteData } from './Light';
import { SSEMotionDeleteData } from './Motion';
import { SSEGroupedLightDeleteData } from './GroupedLight';
import { SSEDevicePowerDeleteData } from './DevicePower';
import { SSEZigbeeConnectivityDeleteData } from './ZigbeeConnectivity';
import { SSEZigbeeDeviceDiscoveryDeleteData } from './ZigbeeDeviceDiscovery';
import { SSEGeolocationDeleteData } from './Geolocation';
import { SSEBridgeDeleteData } from './Bridge';

export type MakeSSEDeleteData<TAPIResource extends Record<string, any>> = Pick<
	TAPIResource,
	'type' | 'id' | 'owner' | 'group'
>;

export interface SSEPossibleDeleteData {
	[APIResourceType.Device]: SSEDeviceDeleteData;
	[APIResourceType.BridgeHome]: SSEBridgeHomeDeleteData;
	[APIResourceType.Room]: SSERoomDeleteData;
	[APIResourceType.Zone]: SSEZoneDeleteData;
	[APIResourceType.Light]: SSELightDeleteData;
	[APIResourceType.Button]: never;
	[APIResourceType.Temperature]: never;
	[APIResourceType.LightLevel]: never;
	[APIResourceType.Motion]: SSEMotionDeleteData;
	[APIResourceType.Entertainment]: never;
	[APIResourceType.GroupedLight]: SSEGroupedLightDeleteData;
	[APIResourceType.DevicePower]: SSEDevicePowerDeleteData;
	[APIResourceType.ZigbeeConnectivity]: SSEZigbeeConnectivityDeleteData;
	[APIResourceType.ZgpConnectivity]: never;
	[APIResourceType.ZigbeeDeviceDiscovery]: SSEZigbeeDeviceDiscoveryDeleteData;
	[APIResourceType.Bridge]: SSEBridgeDeleteData;
	[APIResourceType.Homekit]: never;
	[APIResourceType.Scene]: SSESceneDeleteData;
	[APIResourceType.EntertainmentConfiguration]: never;
	[APIResourceType.PublicImage]: never;
	[APIResourceType.BehaviourScript]: never;
	[APIResourceType.BehaviourInstance]: never;
	[APIResourceType.Geofence]: never;
	[APIResourceType.GeofenceClient]: never;
	[APIResourceType.Geolocation]: SSEGeolocationDeleteData;
}

export type SSEDeleteData<TAPIResourceType extends APIResourceType> = SSEPossibleDeleteData[TAPIResourceType];
