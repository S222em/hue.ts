import { Bridge } from './Bridge';
import { Request, Response } from '../connections/Rest';
import { Light } from '../structures/Light';
import { NarrowResource } from '../structures/Resource';
import { Device } from '../structures/Device';
import { Room } from '../structures/Room';
import { Zone } from '../structures/Zone';
import { Scene } from '../structures/Scene';
import { GroupedLight } from '../structures/GroupedLight';

export const Events = {
	Ready: 'ready',
	Error: 'error',
	Raw: 'raw',
	Debug: 'debug',
	Request: 'request',
	Response: 'response',
	Add: 'add',
	Update: 'update',
	Delete: 'delete',
	DeviceAdd: 'deviceAdd',
	DeviceUpdate: 'deviceUpdate',
	DeviceDelete: 'deviceDelete',
	GroupedLightAdd: 'groupedLightAdd',
	GroupedLightUpdate: 'groupedLightUpdate',
	GroupedLightDelete: 'groupedLightDelete',
	LightAdd: 'lightAdd',
	LightUpdate: 'lightUpdate',
	LightDelete: 'lightDelete',
	RoomAdd: 'roomAdd',
	RoomUpdate: 'roomUpdate',
	RoomDelete: 'roomDelete',
	SceneAdd: 'sceneAdd',
	SceneUpdate: 'sceneUpdate',
	SceneDelete: 'sceneDelete',
	ZoneAdd: 'zoneAdd',
	ZoneUpdate: 'zoneUpdate',
	ZoneDelete: 'zoneDelete',
} as const;

export interface BridgeEvents {
	[Events.Ready]: [bridge: Bridge];
	[Events.Error]: [error: Error];
	[Events.Raw]: [data: Record<string, any>];
	[Events.Debug]: [debug: string];
	[Events.Request]: [request: Request];
	[Events.Response]: [response: Response];
	[Events.Add]: [resource: NarrowResource<any>];
	[Events.Update]: [newResource: NarrowResource<any>, oldResource: NarrowResource<any>];
	[Events.Delete]: [NarrowResource<any>];
	[Events.DeviceAdd]: [device: Device];
	[Events.DeviceUpdate]: [newDevice: Device, oldDevice: Device];
	[Events.DeviceDelete]: [device: Device];
	[Events.GroupedLightAdd]: [groupedLight: GroupedLight];
	[Events.GroupedLightUpdate]: [newGroupedLight: GroupedLight, oldGroupedLight: GroupedLight];
	[Events.GroupedLightDelete]: [groupedLight: GroupedLight];
	[Events.LightAdd]: [light: Light];
	[Events.LightUpdate]: [newLight: Light, oldLight: Light];
	[Events.LightDelete]: [light: Light];
	[Events.RoomAdd]: [room: Room];
	[Events.RoomUpdate]: [newRoom: Room, oldRoom: Room];
	[Events.RoomDelete]: [room: Room];
	[Events.SceneAdd]: [scene: Scene];
	[Events.SceneUpdate]: [newScene: Scene, oldScene: Scene];
	[Events.SceneDelete]: [scene: Scene];
	[Events.ZoneAdd]: [zone: Zone];
	[Events.ZoneUpdate]: [newZone: Room, oldZone: Zone];
	[Events.ZoneDelete]: [zone: Zone];
}
