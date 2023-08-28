import { EventEmitter } from 'node:events';
import { Events, HueEvents } from './HueEvents';
import { REST } from '../connections/Rest';
import { SSE } from '../connections/Sse';
import { LightManager } from '../managers/LightManager';
import { DeviceManager } from '../managers/DeviceManager';
import { RoomManager } from '../managers/RoomManager';
import { ZoneManager } from '../managers/ZoneManager';
import { DevicePowerManager } from '../managers/DevicePowerManager';
import { GroupedLightManager } from '../managers/GroupedLightManager';
import { SceneManager } from '../managers/SceneManager';
import { MotionManager } from '../managers/MotionManager';
import { ZigbeeConnectivityManager } from '../managers/ZigbeeConnectivityManager';
import { ZigbeeDeviceDiscoveryManager } from '../managers/ZigbeeDeviceDiscoveryManager';
import { BridgeManager } from '../managers/BridgeManager';
import { BridgeHomeManager } from '../managers/BridgeHomeManager';
import { GeolocationManager } from '../managers/GeolocationManager';
import { RESOURCE_ADD_ACTION } from '../actions';
import { ButtonManager } from '../managers/ButtonManager';
import { TemperatureManager } from '../managers/TemperatureManager';
import { LightLevelManager } from '../managers/LightLevelManager';
import { ZgpConnectivityManager } from '../managers/ZgpConnectivityManager';
import { GeofenceClientManager } from '../managers/GeofenceClientManager';
import { RelativeRotaryManager } from '../managers/RelativeRotaryManager';

export const CA =
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

export interface HueConnectionOptions {
	applicationKey: string;
}

export interface LocalHueConnectionsOptions extends HueConnectionOptions {
	ip: string;
}

export interface ExternalHueConnectionOptions extends HueConnectionOptions {
	accessToken: string;
}

export interface HueOptions {
	connection: LocalHueConnectionsOptions | ExternalHueConnectionOptions;
}

export interface Hue {
	on: <T extends keyof HueEvents>(event: T, listener: (...args: HueEvents[T]) => any) => this;
	once: <T extends keyof HueEvents>(event: T, listener: (...args: HueEvents[T]) => any) => this;
	off: <T extends keyof HueEvents>(event: T, listener: (...args: HueEvents[T]) => any) => this;
	removeListener: <T extends keyof HueEvents>(event: T, listener: (...args: HueEvents[T]) => any) => this;
	removeAllListeners: <T extends keyof HueEvents>(event?: T) => this;
	emit: <T extends keyof HueEvents>(event: T, ...args: HueEvents[T]) => boolean;
}

/**
 * The main hub for interacting with the hue API, and the start of every project
 */
export class Hue extends EventEmitter {
	/**
	 * The options the client was instantiated with
	 */
	public readonly options: HueOptions;

	/**
	 * All of the {@link Light} objects that have been cached, mapped by their ids
	 */
	public readonly lights = new LightManager(this);

	/**
	 * All of the {@link Device} objects that have been cached, mapped by their ids
	 */
	public readonly devices = new DeviceManager(this);

	/**
	 * All of the {@link Room} objects that have been cached, mapped by their ids
	 */
	public readonly rooms = new RoomManager(this);

	/**
	 * All of the {@link Zone} objects that have been cached, mapped by their ids
	 */
	public readonly zones = new ZoneManager(this);

	/**
	 * All of the {@link GroupedLight} objects that have been cached, mapped by their ids
	 */
	public readonly groupedLights = new GroupedLightManager(this);

	/**
	 * All of the {@link DevicePower} objects that have been cached, mapped by their ids
	 */
	public readonly devicePowers = new DevicePowerManager(this);

	/**
	 * All of the {@link Scene} objects that have been cached, mapped by their ids
	 */
	public readonly scenes = new SceneManager(this);

	/**
	 * All of the {@link Motion} objects that have been cached, mapped by their ids
	 */
	public readonly motions = new MotionManager(this);

	/**
	 * All of the {@link ZigbeeConnectivity} objects that have been cached, mapped by their ids
	 */
	public readonly zigbeeConnectivities = new ZigbeeConnectivityManager(this);

	/**
	 * All of the {@link ZigbeeDeviceDiscovery} objects that have been cached, mapped by their ids
	 */
	public readonly zigbeeDeviceDiscoveries = new ZigbeeDeviceDiscoveryManager(this);

	/**
	 * All of the {@link Bridge} objects that have been cached, mapped by their ids
	 */
	public readonly bridges = new BridgeManager(this);

	/**
	 * All of the {@link BridgeHome} objects that have been cached, mapped by their ids
	 */
	public readonly bridgeHomes = new BridgeHomeManager(this);

	/**
	 * All of the {@link Geolocation} objects that have been cached, mapped by their ids
	 */
	public readonly geolocations = new GeolocationManager(this);

	/**
	 * All of the {@link Button} objects that have been cached, mapped by their ids
	 */
	public readonly buttons = new ButtonManager(this);

	/**
	 * All of the {@link Temperature} objects that have been cached, mapped by their ids
	 */
	public readonly temperatures = new TemperatureManager(this);

	/**
	 * All of the {@link LightLevel} objects that have been cached, mapped by their ids
	 */
	public readonly lightLevels = new LightLevelManager(this);

	/**
	 * All of the {@link ZgpConnectivity} objects that have been cached, mapped by their ids
	 */
	public readonly zgpConnectivities = new ZgpConnectivityManager(this);

	/**
	 * All of the {@link GeofenceClient} objects that have been cached, mapped by their ids
	 */
	public readonly geofenceClients = new GeofenceClientManager(this);

	/**
	 * All of the {@link RelativeRotary} objects that have been cached, mapped by their ids
	 */
	public readonly relativeRotaries = new RelativeRotaryManager(this);

	/**
	 * The REST manager
	 * @private
	 */
	public readonly _rest = new REST(this);

	/**
	 * The SSE manager
	 * @private
	 */
	public readonly _sse = new SSE(this);

	public constructor(options: HueOptions) {
		super();
		this.options = options;
	}

	/**
	 * Resolves the url for connections
	 * @private
	 */
	get _url(): string {
		if ('ip' in this.options.connection) return `https://${this.options.connection.ip}:443`;
		else return `https://api.meethue.com/route`;
	}

	/**
	 * Caches all resources and opens the SSE connection
	 */
	public async connect(): Promise<void> {
		const data = await this._rest.get('/resource');

		for (const resource of data.data) {
			const handler = RESOURCE_ADD_ACTION[resource.type];
			if (handler) handler(resource, this);
		}

		await this._sse.connect();

		this.emit(Events.Ready, this);
	}
}
