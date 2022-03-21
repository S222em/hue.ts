import { EventEmitter } from 'events';
import { LightManager } from '../managers/LightManager';
import { Events } from '../util/Events';
import { ActionManager } from './actions/ActionManager';
import type { Light } from '../structures/Light';
import type { Room } from '../structures/Room';
import { RoomManager } from '../managers/RoomManager';
import { GroupedLightManager } from '../managers/GroupedLightManager';
import type { GroupedLight } from '../structures/GroupedLight';
import { ZoneManager } from '../managers/ZoneManager';
import type { Zone } from '../structures/Zone';
import { SceneManager } from '../managers/SceneManager';
import type { Scene } from '../structures/Scene';
import { Rest } from './rest/Rest';
import { Event } from './Event';
import { Routes } from '../util/Routes';
import { ApiResourceType } from '../types/api/common';
import { ApiResource, ApiResourceGet } from '../types/api/resource';
import { ApiLight } from '../types/api/light';
import { ApiGroupedLight } from '../types/api/grouped_light';
import { ApiZone } from '../types/api/zone';
import { ApiRoom } from '../types/api/room';
import { ApiScene } from '../types/api/scene';
import { DeviceManager } from '../managers/DeviceManager';
import { ApiDevice } from '../types/api/device';
import { Device } from '../structures/Device';

export interface BridgeOptions {
	ip: string;
}

export interface BridgeEvents {
	ready: [bridge: Bridge];

	// Device
	deviceAdd: [device: Device];
	deviceUpdate: [oldDevice: Device, newDevice: Device];
	deviceDelete: [device: Device];

	// Light
	lightAdd: [light: Light];
	lightUpdate: [oldLight: Light, newLight: Light];
	lightDelete: [light: Light];

	// GroupedLight
	groupedLightAdd: [groupedLight: GroupedLight];
	groupedLightUpdate: [oldGroupedLight: GroupedLight, newGroupedLight: GroupedLight];
	groupedLightDelete: [groupedLight: GroupedLight];

	// Room
	roomAdd: [room: Room];
	roomUpdate: [oldRoom: Room, newRoom: Room];
	roomDelete: [room: Room];

	// Zone
	zoneAdd: [zone: Zone];
	zoneUpdate: [oldZone: Zone, newZone: Zone];
	zoneDelete: [zone: Zone];

	// Scene
	sceneAdd: [scene: Scene];
	sceneUpdate: [oldScene: Scene, newScene: Scene];
	sceneDelete: [scene: Scene];
}

export class Bridge extends EventEmitter {
	public readonly ip: string;
	public applicationKey: string;
	public rest: Rest;
	public event: Event;
	public devices = new DeviceManager(this);
	public lights = new LightManager(this);
	public groupedLights = new GroupedLightManager(this);
	public rooms = new RoomManager(this);
	public zones = new ZoneManager(this);
	public scenes = new SceneManager(this);
	public actions = new ActionManager(this);
	public on: <K extends keyof BridgeEvents>(event: K, listener: (...args: BridgeEvents[K]) => any) => this;
	public once: <K extends keyof BridgeEvents>(event: K, listener: (...args: BridgeEvents[K]) => any) => this;
	public emit: <K extends keyof BridgeEvents>(event: K, ...args: BridgeEvents[K]) => boolean;
	public off: <K extends keyof BridgeEvents>(event: K, listener: (...args: BridgeEvents[K]) => any) => this;
	public removeAllListeners: <K extends keyof BridgeEvents>(event?: K) => this;

	constructor(options: BridgeOptions) {
		super();
		this.ip = options.ip;
	}

	public connect(applicationKey: string): void {
		this.applicationKey = applicationKey;
		this.rest = new Rest(this.ip, applicationKey);
		this.event = new Event(this, this.ip, applicationKey);

		setImmediate(async () => {
			const response = await this.rest.get(Routes.resource());

			const data = response.data as ApiResourceGet;

			for (const device of data.data.filter((resource: ApiResource) => resource.type === ApiResourceType.Device)) {
				this.devices._add(device as ApiDevice);
			}

			for (const light of data.data.filter((resource: ApiResource) => resource.type === ApiResourceType.Light)) {
				this.lights._add(light as ApiLight);
			}

			for (const groupedLight of data.data.filter(
				(resource: ApiResource) => resource.type === ApiResourceType.GroupedLight,
			)) {
				this.groupedLights._add(groupedLight as ApiGroupedLight);
			}

			for (const room of data.data.filter((resource: ApiResource) => resource.type === ApiResourceType.Room)) {
				this.rooms._add(room as ApiRoom);
			}

			for (const zone of data.data.filter((resource: ApiResource) => resource.type === ApiResourceType.Zone)) {
				this.zones._add(zone as ApiZone);
			}

			for (const scene of data.data.filter((resource: ApiResource) => resource.type === ApiResourceType.Scene)) {
				this.scenes._add(scene as ApiScene);
			}

			this.emit(Events.Ready, this);
		});
	}
}
