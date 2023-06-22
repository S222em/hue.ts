import { ApiResourceType } from '../../api/ApiResourceType';
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

export const RESOURCE_ADD: { [key: string]: (data: any, bridge: Bridge) => void } = {
	[ApiResourceType.Device]: deviceAdd,
	[ApiResourceType.DevicePower]: devicePowerAdd,
	[ApiResourceType.GroupedLight]: groupedLightAdd,
	[ApiResourceType.Light]: lightAdd,
	[ApiResourceType.Motion]: motionAdd,
	[ApiResourceType.Room]: roomAdd,
	[ApiResourceType.Scene]: sceneAdd,
	[ApiResourceType.Zone]: zoneAdd,
};

export const RESOURCE_DELETE: { [key: string]: (data: any, bridge: Bridge) => void } = {
	[ApiResourceType.Device]: deviceDelete,
	[ApiResourceType.DevicePower]: devicePowerDelete,
	[ApiResourceType.GroupedLight]: groupedLightDelete,
	[ApiResourceType.Light]: lightDelete,
	[ApiResourceType.Motion]: motionDelete,
	[ApiResourceType.Room]: roomDelete,
	[ApiResourceType.Scene]: sceneDelete,
	[ApiResourceType.Zone]: zoneDelete,
};

export const RESOURCE_UPDATE: { [key: string]: (data: any, bridge: Bridge) => void } = {
	[ApiResourceType.Device]: deviceUpdate,
	[ApiResourceType.DevicePower]: devicePowerUpdate,
	[ApiResourceType.GroupedLight]: groupedLightUpdate,
	[ApiResourceType.Light]: lightUpdate,
	[ApiResourceType.Motion]: motionUpdate,
	[ApiResourceType.Room]: roomUpdate,
	[ApiResourceType.Scene]: sceneUpdate,
	[ApiResourceType.Zone]: zoneUpdate,
};
