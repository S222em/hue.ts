import { Dispatcher } from 'undici';
import { ResponseData } from 'undici/types/dispatcher';
import { Bridge } from '../bridge/Bridge';
import { Route } from '../bridge/rest/Route';
import { Device } from '../structures/Device';
import { GroupedLight } from '../structures/GroupedLight';
import { Light } from '../structures/Light';
import { Room } from '../structures/Room';
import { Scene } from '../structures/Scene';
import { Zone } from '../structures/Zone';
import { Events } from '../util/Events';

export interface BridgeEvents {
	[Events.Ready]: [bridge: Bridge];
	[Events.Debug]: [debug: string];

	// REST
	[Events.ApiRequest]: [
		request: { dispatcher?: Dispatcher } & Omit<Dispatcher.RequestOptions, 'origin' | 'path' | 'method'> &
			Partial<Pick<Dispatcher.RequestOptions, 'method'>>,
		route: Route,
	];
	[Events.ApiResponse]: [response: ResponseData, route: Route];
	[Events.RateLimited]: [until: Date, route: Route];

	// SSE
	[Events.Raw]: [raw: Array<Record<string, any>>];
	[Events.Disconnect]: [];
	[Events.Error]: [message: string];

	// Device
	[Events.DeviceAdd]: [device: Device];
	[Events.DeviceUpdate]: [oldDevice: Device, newDevice: Device];
	[Events.DeviceDelete]: [device: Device];

	// Light
	[Events.LightAdd]: [light: Light];
	[Events.LightUpdate]: [oldLight: Light, newLight: Light];
	[Events.LightDelete]: [light: Light];

	// GroupedLight
	[Events.GroupedLightAdd]: [groupedLight: GroupedLight];
	[Events.GroupedLightUpdate]: [oldGroupedLight: GroupedLight, newGroupedLight: GroupedLight];
	[Events.GroupedLightDelete]: [groupedLight: GroupedLight];

	// Room
	[Events.RoomAdd]: [room: Room];
	[Events.RoomUpdate]: [oldRoom: Room, newRoom: Room];
	[Events.RoomDelete]: [room: Room];

	// Zone
	[Events.ZoneAdd]: [zone: Zone];
	[Events.ZoneUpdate]: [oldZone: Zone, newZone: Zone];
	[Events.ZoneDelete]: [zone: Zone];

	// Scene
	[Events.SceneAdd]: [scene: Scene];
	[Events.SceneUpdate]: [oldScene: Scene, newScene: Scene];
	[Events.SceneDelete]: [scene: Scene];
}
