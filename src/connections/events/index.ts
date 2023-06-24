import { ResourceType } from '../../api/ResourceType';
import deviceAdd from './add/DeviceAdd';
import devicePowerAdd from './add/DevicePowerAdd';
import groupedLightAdd from './add/GroupedLightAdd';
import lightAdd from './add/LightAdd';
import motionAdd from './add/MotionAdd';
import roomAdd from './add/RoomAdd';
import sceneAdd from './add/SceneAdd';
import zoneAdd from './add/ZoneAdd';
import deviceDelete from './delete/DeviceDelete';
import devicePowerDelete from './delete/DevicePowerDelete';
import groupedLightDelete from './delete/GroupedLightDelete';
import lightDelete from './delete/LightDelete';
import motionDelete from './delete/MotionDelete';
import roomDelete from './delete/RoomDelete';
import sceneDelete from './delete/SceneDelete';
import zoneDelete from './delete/ZoneDelete';
import deviceUpdate from './update/DeviceUpdate';
import devicePowerUpdate from './update/DevicePowerUpdate';
import groupedLightUpdate from './update/GroupedLightUpdate';
import lightUpdate from './update/LightUpdate';
import motionUpdate from './update/MotionUpdate';
import roomUpdate from './update/RoomUpdate';
import sceneUpdate from './update/SceneUpdate';
import zoneUpdate from './update/ZoneUpdate';
import { Bridge } from '../../bridge/Bridge';

export const RESOURCE_ADD: { [key: string]: (data: any, bridge: Bridge) => (() => boolean) | undefined } = {
	[ResourceType.Device]: deviceAdd,
	[ResourceType.DevicePower]: devicePowerAdd,
	[ResourceType.GroupedLight]: groupedLightAdd,
	[ResourceType.Light]: lightAdd,
	[ResourceType.Motion]: motionAdd,
	[ResourceType.Room]: roomAdd,
	[ResourceType.Scene]: sceneAdd,
	[ResourceType.Zone]: zoneAdd,
};

export const RESOURCE_DELETE: { [key: string]: (data: any, bridge: Bridge) => (() => boolean) | undefined } = {
	[ResourceType.Device]: deviceDelete,
	[ResourceType.DevicePower]: devicePowerDelete,
	[ResourceType.GroupedLight]: groupedLightDelete,
	[ResourceType.Light]: lightDelete,
	[ResourceType.Motion]: motionDelete,
	[ResourceType.Room]: roomDelete,
	[ResourceType.Scene]: sceneDelete,
	[ResourceType.Zone]: zoneDelete,
};

export const RESOURCE_UPDATE: { [key: string]: (data: any, bridge: Bridge) => (() => boolean) | undefined } = {
	[ResourceType.Device]: deviceUpdate,
	[ResourceType.DevicePower]: devicePowerUpdate,
	[ResourceType.GroupedLight]: groupedLightUpdate,
	[ResourceType.Light]: lightUpdate,
	[ResourceType.Motion]: motionUpdate,
	[ResourceType.Room]: roomUpdate,
	[ResourceType.Scene]: sceneUpdate,
	[ResourceType.Zone]: zoneUpdate,
};
