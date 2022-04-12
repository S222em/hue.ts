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
	/**
	 * Ip of the bridge
	 */
	ip: string;

	/**
	 * Key for authorization
	 */
	applicationKey: string;
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

/**
 * Represents a Hue bridge
 */
export class Bridge extends EventEmitter {
	/**
	 * Ip of the bridge
	 */
	public readonly ip: string;
	/**
	 * Key for authorization
	 */
	public applicationKey: string;
	/**
	 * Manager for requests to the bridge
	 * @internal
	 */
	public rest: Rest;
	/**
	 * Event source for updates from the bridge
	 * @internal
	 */
	public event: Event;
	/**
	 * All devices that belong to this bridge
	 */
	public devices = new DeviceManager(this);
	/**
	 * All lights that belong to this bridge
	 */
	public lights = new LightManager(this);
	/**
	 * All grouped lights that belong to this bridge
	 */
	public groupedLights = new GroupedLightManager(this);
	/**
	 * All rooms that belong to this bridge
	 */
	public rooms = new RoomManager(this);
	/**
	 * All zones that belong to this bridge
	 */
	public zones = new ZoneManager(this);
	/**
	 * All scenes that belong to this bridge
	 */
	public scenes = new SceneManager(this);
	/**
	 * Actions to execute when bridge#events receives an event
	 * @internal
	 */
	public actions = new ActionManager(this);
	public on: <K extends keyof BridgeEvents>(event: K, listener: (...args: BridgeEvents[K]) => any) => this;
	public once: <K extends keyof BridgeEvents>(event: K, listener: (...args: BridgeEvents[K]) => any) => this;
	public emit: <K extends keyof BridgeEvents>(event: K, ...args: BridgeEvents[K]) => boolean;
	public off: <K extends keyof BridgeEvents>(event: K, listener: (...args: BridgeEvents[K]) => any) => this;
	public removeAllListeners: <K extends keyof BridgeEvents>(event?: K) => this;

	/**
	 * @param options Options for the bridge
	 * @example
	 * const bridge = new Bridge({
	 *   ip: 'some-ip',
	 *   applicationKey: 'some-key'
	 * });
	 * @constructor
	 */
	public constructor(options: BridgeOptions) {
		super();
		this.ip = options.ip;
	}

	/**
	 * Initiates a connection with the bridge and fetches all resources
	 */
	public connect(): void {
		this.rest = new Rest(this.ip, this.applicationKey);
		this.event = new Event(this, this.ip, this.applicationKey);

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
