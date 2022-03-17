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

export enum BridgeResourceType {
	Lights,
	GroupedLights,
	Rooms,
	Zones,
	Scenes,
}

export interface BridgeOptions {
	ip: string;
	applicationKey: string;
	resources: BridgeResourceType[];
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

/**
 * Represents a hue Bridge
 */
export class Bridge extends EventEmitter {
	/**
	 * The ip of the Bridge
	 */
	public readonly ip: string;
	/**
	 * The application key of the user
	 */
	public applicationKey: string;
	/**
	 * Used to send requests to the Bridge
	 * @internal
	 */
	public rest: AxiosInstance;
	/**
	 * Used to listen to events send by the Bridge
	 * @internal
	 */
	public event: Event;
	/**
	 * A manager with the Lights of this Bridge
	 */
	public lights: LightManager;
	/**
	 * A manager with the Grouped Lights of this Bridge
	 */
	public groupedLights: GroupedLightManager;
	/**
	 * A manager with the Rooms of this Bridge
	 */
	public rooms: RoomManager;
	/**
	 * A manager with the Zones of this Bridge
	 */
	public zones: ZoneManager;
	/**
	 * A manager with the Scenes of this Bridge
	 */
	public scenes: SceneManager;
	/**
	 * A manager with the Actions for this Bridge
	 * @internal
	 */
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
			if (options.resources.includes(BridgeResourceType.Lights)) await this.lights.fetch();
			if (options.resources.includes(BridgeResourceType.GroupedLights)) await this.groupedLights.fetch();
			if (options.resources.includes(BridgeResourceType.Rooms)) await this.rooms.fetch();
			if (options.resources.includes(BridgeResourceType.Zones)) await this.zones.fetch();
			if (options.resources.includes(BridgeResourceType.Scenes)) await this.scenes.fetch();
			this.emit(Events.Ready, this);
		});
	}
}
