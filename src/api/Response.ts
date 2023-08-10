import { APIResourceType } from './ResourceType';
import { APIResourceIdentifier } from './ResourceIdentifier';
import { RESTBridgeHomeGetResponseData } from './BridgeHome';
import { RESTMotionGetResponseData } from './Motion';
import { RESTDevicePowerGetResponseData } from './DevicePower';
import { RESTZigbeeConnectivityGetResponseData } from './ZigbeeConnectivity';
import { RESTZigbeeDeviceDiscoveryGetResponseData } from './ZigbeeDeviceDiscovery';
import { RESTGeolocationGetResponseData } from './Geolocation';
import { RESTDeviceGetResponseData } from './Device';
import { RESTRoomGetResponseData } from './Room';
import { RESTZoneGetResponseData } from './Zone';
import { RESTLightGetResponseData } from './Light';
import { RESTGroupedLightGetResponseData } from './GroupedLight';
import { RESTBridgeGetResponseData } from './Bridge';
import { RESTSceneGetResponseData } from './Scene';
import { RESTResponseError } from './Error';

type RESTGenericResponseData<TAPIResourceType extends APIResourceType> = Array<APIResourceIdentifier<TAPIResourceType>>;

interface RestGetPossibleResponseData {
	[APIResourceType.Device]: RESTDeviceGetResponseData;
	[APIResourceType.BridgeHome]: RESTBridgeHomeGetResponseData;
	[APIResourceType.Room]: RESTRoomGetResponseData;
	[APIResourceType.Zone]: RESTZoneGetResponseData;
	[APIResourceType.Light]: RESTLightGetResponseData;
	[APIResourceType.Button]: never;
	[APIResourceType.Temperature]: never;
	[APIResourceType.LightLevel]: never;
	[APIResourceType.Motion]: RESTMotionGetResponseData;
	[APIResourceType.Entertainment]: never;
	[APIResourceType.GroupedLight]: RESTGroupedLightGetResponseData;
	[APIResourceType.DevicePower]: RESTDevicePowerGetResponseData;
	[APIResourceType.ZigbeeConnectivity]: RESTZigbeeConnectivityGetResponseData;
	[APIResourceType.ZgpConnectivity]: never;
	[APIResourceType.ZigbeeDeviceDiscovery]: RESTZigbeeDeviceDiscoveryGetResponseData;
	[APIResourceType.Bridge]: RESTBridgeGetResponseData;
	[APIResourceType.Homekit]: never;
	[APIResourceType.Scene]: RESTSceneGetResponseData;
	[APIResourceType.EntertainmentConfiguration]: never;
	[APIResourceType.PublicImage]: never;
	[APIResourceType.BehaviourScript]: never;
	[APIResourceType.BehaviourInstance]: never;
	[APIResourceType.Geofence]: never;
	[APIResourceType.GeofenceClient]: never;
	[APIResourceType.Geolocation]: RESTGeolocationGetResponseData;
}

export type RESTGetResponseData<TAPIResourceType extends APIResourceType> =
	RestGetPossibleResponseData[TAPIResourceType];

export type RESTPutResponseData<TAPIResourceType extends APIResourceType> = RESTGenericResponseData<TAPIResourceType>;

export type RESTPostResponseData<TAPIResourceType extends APIResourceType> = RESTGenericResponseData<TAPIResourceType>;

export type RESTDeleteResponseData<TAPIResourceType extends APIResourceType> =
	RESTGenericResponseData<TAPIResourceType>;

interface RESTResponse<TResponseData> {
	data: TResponseData;
	errors: RESTResponseError;
}

export type RESTGetResponse<TAPIResourceType extends APIResourceType> = RESTResponse<
	RESTGetResponseData<TAPIResourceType>
>;

export type RESTPutResponse<TAPIResourceType extends APIResourceType> = RESTResponse<
	RESTPutResponseData<TAPIResourceType>
>;

export type RESTPostResponse<TAPIResourceType extends APIResourceType> = RESTResponse<
	RESTPostResponseData<TAPIResourceType>
>;

export type RESTDeleteResponse<TAPIResourceType extends APIResourceType> = RESTResponse<
	RESTDeleteResponseData<TAPIResourceType>
>;
