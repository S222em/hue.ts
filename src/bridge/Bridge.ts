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
import type { AxiosInstance } from 'axios';
import { getRest } from './Rest';
import { Event } from './Event';

export interface BridgeOptions {
	ip: string;
	applicationKey: string;
}

export interface BridgeEvents {
	ready: [bridge: Bridge];

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
	public rest: AxiosInstance;
	public event: Event;
	public lights: LightManager;
	public groupedLights: GroupedLightManager;
	public rooms: RoomManager;
	public zones: ZoneManager;
	public scenes: SceneManager;
	public actions: ActionManager;
	public on: <K extends keyof BridgeEvents>(event: K, listener: (...args: BridgeEvents[K]) => any) => this;
	public once: <K extends keyof BridgeEvents>(event: K, listener: (...args: BridgeEvents[K]) => any) => this;
	public emit: <K extends keyof BridgeEvents>(event: K, ...args: BridgeEvents[K]) => boolean;
	public off: <K extends keyof BridgeEvents>(event: K, listener: (...args: BridgeEvents[K]) => any) => this;
	public removeAllListeners: <K extends keyof BridgeEvents>(event?: K) => this;

	constructor(options: BridgeOptions) {
		super();
		this.ip = options.ip;
		this.applicationKey = options.applicationKey;

		this.rest = getRest(options.ip, options.applicationKey);
		this.event = new Event(this, options.ip, options.applicationKey);

		this.lights = new LightManager(this);
		this.groupedLights = new GroupedLightManager(this);
		this.rooms = new RoomManager(this);
		this.zones = new ZoneManager(this);
		this.scenes = new SceneManager(this);
		this.actions = new ActionManager(this);

		setImmediate(async () => {
			await this.lights.sync();
			await this.groupedLights.sync();
			await this.rooms.sync();
			await this.zones.sync();
			await this.scenes.sync();
			this.emit(Events.Ready, this);
		});
	}
}
