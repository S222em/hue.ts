import { APIResourceType } from './ResourceType';
import { SSERoomAddData } from './Room';
import { SSEZoneAddData } from './Zone';
import { SSESceneAddData } from './Scene';
import { SSEDeviceAddData } from './Device';
import { SSEBridgeHomeAddData } from './BridgeHome';
import { SSELightAddData } from './Light';
import { SSEMotionAddData } from './Motion';
import { SSEGroupedLightAddData } from './GroupedLight';
import { SSEDevicePowerAddData } from './DevicePower';
import { SSEZigbeeConnectivityAddData } from './ZigbeeConnectivity';
import { SSEZigbeeDeviceDiscoveryAddData } from './ZigbeeDeviceDiscovery';
import { SSEGeolocationAddData } from './Geolocation';
import { SSEBridgeAddData } from './Bridge';

interface SSEPossibleAddData {
	[APIResourceType.Device]: SSEDeviceAddData;
	[APIResourceType.BridgeHome]: SSEBridgeHomeAddData;
	[APIResourceType.Room]: SSERoomAddData;
	[APIResourceType.Zone]: SSEZoneAddData;
	[APIResourceType.Light]: SSELightAddData;
	[APIResourceType.Button]: never;
	[APIResourceType.Temperature]: never;
	[APIResourceType.LightLevel]: never;
	[APIResourceType.Motion]: SSEMotionAddData;
	[APIResourceType.Entertainment]: never;
	[APIResourceType.GroupedLight]: SSEGroupedLightAddData;
	[APIResourceType.DevicePower]: SSEDevicePowerAddData;
	[APIResourceType.ZigbeeConnectivity]: SSEZigbeeConnectivityAddData;
	[APIResourceType.ZgpConnectivity]: never;
	[APIResourceType.ZigbeeDeviceDiscovery]: SSEZigbeeDeviceDiscoveryAddData;
	[APIResourceType.Bridge]: SSEBridgeAddData;
	[APIResourceType.Homekit]: never;
	[APIResourceType.Scene]: SSESceneAddData;
	[APIResourceType.EntertainmentConfiguration]: never;
	[APIResourceType.PublicImage]: never;
	[APIResourceType.BehaviourScript]: never;
	[APIResourceType.BehaviourInstance]: never;
	[APIResourceType.Geofence]: never;
	[APIResourceType.GeofenceClient]: never;
	[APIResourceType.Geolocation]: SSEGeolocationAddData;
}

export type SSEAddData<TAPIResourceType extends APIResourceType> = SSEPossibleAddData[TAPIResourceType];
