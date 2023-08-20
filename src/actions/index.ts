import { APIResourceType } from '../types/api';
import deviceAdd from './DeviceAdd';
import devicePowerAdd from './DevicePowerAdd';
import groupedLightAdd from './GroupedLightAdd';
import lightAdd from './LightAdd';
import motionAdd from './MotionAdd';
import roomAdd from './RoomAdd';
import sceneAdd from './SceneAdd';
import zoneAdd from './ZoneAdd';
import deviceDelete from './DeviceDelete';
import devicePowerDelete from './DevicePowerDelete';
import groupedLightDelete from './GroupedLightDelete';
import lightDelete from './LightDelete';
import motionDelete from './MotionDelete';
import roomDelete from './RoomDelete';
import sceneDelete from './SceneDelete';
import zoneDelete from './ZoneDelete';
import deviceUpdate from './DeviceUpdate';
import devicePowerUpdate from './DevicePowerUpdate';
import groupedLightUpdate from './GroupedLightUpdate';
import lightUpdate from './LightUpdate';
import motionUpdate from './MotionUpdate';
import roomUpdate from './RoomUpdate';
import sceneUpdate from './SceneUpdate';
import zoneUpdate from './ZoneUpdate';
import { Hue } from '../hue/Hue';
import zigbeeConnectivityAdd from './ZigbeeConnectivityAdd';
import zigbeeConnectivityDelete from './ZigbeeConnectivityDelete';
import zigbeeConnectivityUpdate from './ZigbeeConnectivityUpdate';
import zigbeeDeviceDiscoveryAdd from './ZigbeeDeviceDiscoveryAdd';
import zigbeeDeviceDiscoveryDelete from './ZigbeeDeviceDiscoveryDelete';
import zigbeeDeviceDiscoveryUpdate from './ZigbeeDeviceDiscoveryUpdate';
import bridgeAdd from './BridgeAdd';
import bridgeDelete from './BridgeDelete';
import bridgeUpdate from './BridgeUpdate';
import bridgeHomeAdd from './BridgeHomeAdd';
import bridgeHomeDelete from './BridgeHomeDelete';
import bridgeHomeUpdate from './BridgeHomeUpdate';
import geolocationAdd from './GeolocationAdd';
import geolocationDelete from './GeolocationDelete';
import geolocationUpdate from './GeolocationUpdate';
import { SSEResource } from '../types/sse';
import buttonAdd from './ButtonAdd';
import buttonDelete from './ButtonDelete';
import buttonUpdate from './ButtonUpdate';
import temperatureAdd from './TemperatureAdd';
import temperatureDelete from './TemperatureDelete';
import temperatureUpdate from './TemperatureUpdate';

export const RESOURCE_ADD_ACTION: { [key: string]: (data: SSEResource, hue: Hue) => (() => boolean) | undefined } = {
	[APIResourceType.Device]: deviceAdd,
	[APIResourceType.DevicePower]: devicePowerAdd,
	[APIResourceType.GroupedLight]: groupedLightAdd,
	[APIResourceType.Light]: lightAdd,
	[APIResourceType.Motion]: motionAdd,
	[APIResourceType.Room]: roomAdd,
	[APIResourceType.Scene]: sceneAdd,
	[APIResourceType.Zone]: zoneAdd,
	[APIResourceType.ZigbeeConnectivity]: zigbeeConnectivityAdd,
	[APIResourceType.ZigbeeDeviceDiscovery]: zigbeeDeviceDiscoveryAdd,
	[APIResourceType.Bridge]: bridgeAdd,
	[APIResourceType.BridgeHome]: bridgeHomeAdd,
	[APIResourceType.Geolocation]: geolocationAdd,
	[APIResourceType.Button]: buttonAdd,
	[APIResourceType.Temperature]: temperatureAdd,
};

export const RESOURCE_DELETE_ACTION: { [key: string]: (data: SSEResource, hue: Hue) => (() => boolean) | undefined } = {
	[APIResourceType.Device]: deviceDelete,
	[APIResourceType.DevicePower]: devicePowerDelete,
	[APIResourceType.GroupedLight]: groupedLightDelete,
	[APIResourceType.Light]: lightDelete,
	[APIResourceType.Motion]: motionDelete,
	[APIResourceType.Room]: roomDelete,
	[APIResourceType.Scene]: sceneDelete,
	[APIResourceType.Zone]: zoneDelete,
	[APIResourceType.ZigbeeConnectivity]: zigbeeConnectivityDelete,
	[APIResourceType.ZigbeeDeviceDiscovery]: zigbeeDeviceDiscoveryDelete,
	[APIResourceType.Bridge]: bridgeDelete,
	[APIResourceType.BridgeHome]: bridgeHomeDelete,
	[APIResourceType.Geolocation]: geolocationDelete,
	[APIResourceType.Button]: buttonDelete,
	[APIResourceType.Temperature]: temperatureDelete,
};

export const RESOURCE_UPDATE_ACTION: { [key: string]: (data: SSEResource, hue: Hue) => (() => boolean) | undefined } = {
	[APIResourceType.Device]: deviceUpdate,
	[APIResourceType.DevicePower]: devicePowerUpdate,
	[APIResourceType.GroupedLight]: groupedLightUpdate,
	[APIResourceType.Light]: lightUpdate,
	[APIResourceType.Motion]: motionUpdate,
	[APIResourceType.Room]: roomUpdate,
	[APIResourceType.Scene]: sceneUpdate,
	[APIResourceType.Zone]: zoneUpdate,
	[APIResourceType.ZigbeeConnectivity]: zigbeeConnectivityUpdate,
	[APIResourceType.ZigbeeDeviceDiscovery]: zigbeeDeviceDiscoveryUpdate,
	[APIResourceType.Bridge]: bridgeUpdate,
	[APIResourceType.BridgeHome]: bridgeHomeUpdate,
	[APIResourceType.Geolocation]: geolocationUpdate,
	[APIResourceType.Button]: buttonUpdate,
	[APIResourceType.Temperature]: temperatureUpdate,
};