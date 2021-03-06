import { EventEmitter } from 'node:events';
import { LightManager } from '../managers/LightManager';
import { ActionManager } from './actions/ActionManager';
import { RoomManager } from '../managers/RoomManager';
import { GroupedLightManager } from '../managers/GroupedLightManager';
import { ZoneManager } from '../managers/ZoneManager';
import { SceneManager } from '../managers/SceneManager';
import { REST } from './rest/REST';
import { SSE } from './SSE';
import { DeviceManager } from '../managers/DeviceManager';
import { Routes } from '../util/Routes';
import { ApiDevice } from '../types/api/device';
import { ApiResource, ApiResourceGet } from '../types/api/resource';
import { ApiResourceType } from '../types/api/common';
import { ApiLight } from '../types/api/light';
import { ApiGroupedLight } from '../types/api/grouped_light';
import { ApiRoom } from '../types/api/room';
import { ApiZone } from '../types/api/zone';
import { ApiScene } from '../types/api/scene';
import { Events } from '../util/Events';
import { BridgeEvents } from '../types/events';

export const BridgeCA =
	'-----BEGIN CERTIFICATE-----\n' +
	'MIICMjCCAdigAwIBAgIUO7FSLbaxikuXAljzVaurLXWmFw4wCgYIKoZIzj0EAwIw\n' +
	'OTELMAkGA1UEBhMCTkwxFDASBgNVBAoMC1BoaWxpcHMgSHVlMRQwEgYDVQQDDAty\n' +
	'b290LWJyaWRnZTAiGA8yMDE3MDEwMTAwMDAwMFoYDzIwMzgwMTE5MDMxNDA3WjA5\n' +
	'MQswCQYDVQQGEwJOTDEUMBIGA1UECgwLUGhpbGlwcyBIdWUxFDASBgNVBAMMC3Jv\n' +
	'b3QtYnJpZGdlMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEjNw2tx2AplOf9x86\n' +
	'aTdvEcL1FU65QDxziKvBpW9XXSIcibAeQiKxegpq8Exbr9v6LBnYbna2VcaK0G22\n' +
	'jOKkTqOBuTCBtjAPBgNVHRMBAf8EBTADAQH/MA4GA1UdDwEB/wQEAwIBhjAdBgNV\n' +
	'HQ4EFgQUZ2ONTFrDT6o8ItRnKfqWKnHFGmQwdAYDVR0jBG0wa4AUZ2ONTFrDT6o8\n' +
	'ItRnKfqWKnHFGmShPaQ7MDkxCzAJBgNVBAYTAk5MMRQwEgYDVQQKDAtQaGlsaXBz\n' +
	'IEh1ZTEUMBIGA1UEAwwLcm9vdC1icmlkZ2WCFDuxUi22sYpLlwJY81Wrqy11phcO\n' +
	'MAoGCCqGSM49BAMCA0gAMEUCIEBYYEOsa07TH7E5MJnGw557lVkORgit2Rm1h3B2\n' +
	'sFgDAiEA1Fj/C3AN5psFMjo0//mrQebo0eKd3aWRx+pQY08mk48=\n' +
	'-----END CERTIFICATE-----';

export interface BridgeOptions {
	/**
	 * Ip of the bridge
	 */
	ip: string;

	/**
	 * Key for authorization
	 */
	applicationKey: string;

	/**
	 * Whether unauthorized requests should be allowed
	 * @default true
	 */
	rejectUnauthorized?: boolean;

	/**
	 * Certifacte for SSL validation
	 */
	ca?: string;
}

/**
 * Represents a Hue bridge
 */
export class Bridge extends EventEmitter {
	/**
	 * The options this bridge was instantiated with
	 */
	public options: BridgeOptions;
	/**
	 * Manager for requests to the bridge
	 * @internal
	 */
	public rest: REST;
	/**
	 * Event source for updates from the bridge
	 * @internal
	 */
	public socket: SSE;
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
		this.options = options;
		this.rest = new REST(this);
		this.socket = new SSE(this);
	}

	/**
	 * Initiates a connection with the bridge and fetches all resources
	 */
	public async connect(): Promise<void> {
		await this.socket.connect();

		const data = (await this.rest.get(Routes.resource)) as ApiResourceGet;

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
	}
}
