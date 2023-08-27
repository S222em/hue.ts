import { APIResourceType } from '../types/api';
import { Hue } from '../hue/Hue';
import { SSEResource } from '../types/sse';
import { devicePowerAdd, devicePowerDelete, devicePowerUpdate } from './DevicePower';
import { deviceAdd, deviceDelete, deviceUpdate } from './Device';
import { groupedLightAdd, groupedLightDelete, groupedLightUpdate } from './GroupedLight';
import { lightAdd, lightDelete, lightUpdate } from './Light';
import { motionAdd, motionDelete, motionUpdate } from './Motion';
import { roomAdd, roomDelete, roomUpdate } from './Room';
import { sceneAdd, sceneDelete, sceneUpdate } from './Scene';
import { zoneAdd, zoneDelete, zoneUpdate } from './Zone';
import { zigbeeConnectivityAdd, zigbeeConnectivityDelete, zigbeeConnectivityUpdate } from './ZigbeeConnectivity';
import {
	zigbeeDeviceDiscoveryAdd,
	zigbeeDeviceDiscoveryDelete,
	zigbeeDeviceDiscoveryUpdate,
} from './ZigbeeDeviceDiscovery';
import { bridgeAdd, bridgeDelete, bridgeUpdate } from './Bridge';
import { bridgeHomeAdd, bridgeHomeDelete, bridgeHomeUpdate } from './BridgeHome';
import { geolocationAdd, geolocationDelete, geolocationUpdate } from './Geolocation';
import { buttonAdd, buttonDelete, buttonUpdate } from './Button';
import { temperatureAdd, temperatureDelete, temperatureUpdate } from './Temperature';
import { lightLevelAdd, lightLevelDelete, lightLevelUpdate } from './LightLevel';
import { zgpConnectivityAdd, zgpConnectivityDelete, zgpConnectivityUpdate } from './ZgpConnectivity';

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
	[APIResourceType.LightLevel]: lightLevelAdd,
	[APIResourceType.ZgpConnectivity]: zgpConnectivityAdd,
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
	[APIResourceType.LightLevel]: lightLevelDelete,
	[APIResourceType.ZgpConnectivity]: zgpConnectivityDelete,
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
	[APIResourceType.LightLevel]: lightLevelUpdate,
	[APIResourceType.ZgpConnectivity]: zgpConnectivityUpdate,
};
