import { EventEmitter } from 'node:events';
import { BridgeEvents, Events } from './BridgeEvents';
import { Rest } from '../connections/Rest';
import { Sse } from '../connections/Sse';
import { ResourceType } from '../api/ResourceType';
import { NarrowResource } from '../structures/Resource';
import { LightManager } from '../managers/LightManager';
import { DeviceManager } from '../managers/DeviceManager';
import { RoomManager } from '../managers/RoomManager';
import { ZoneManager } from '../managers/ZoneManager';
import { DevicePowerManager } from '../managers/DevicePowerManager';
import { GroupedLightManager } from '../managers/GroupedLightManager';
import { SceneManager } from '../managers/SceneManager';
import { MotionManager } from '../managers/MotionManager';

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

export interface BridgeConnectionOptions {
	applicationKey: string;
}

export interface LocalBridgeConnectionsOptions extends BridgeConnectionOptions {
	ip: string;
}

export interface ExternalBridgeConnectionOptions extends BridgeConnectionOptions {
	accessToken: string;
}

export interface BridgeOptions {
	connection: LocalBridgeConnectionsOptions | ExternalBridgeConnectionOptions;
}

export interface Bridge {
	on: <T extends keyof BridgeEvents>(event: T, listener: (...args: BridgeEvents[T]) => any) => this;
	once: <T extends keyof BridgeEvents>(event: T, listener: (...args: BridgeEvents[T]) => any) => this;
	off: <T extends keyof BridgeEvents>(event: T, listener: (...args: BridgeEvents[T]) => any) => this;
	removeAllListeners: <T extends keyof BridgeEvents>(event?: T) => this;
}

export class Bridge extends EventEmitter {
	public readonly options: BridgeOptions;
	public readonly rest = new Rest(this);
	public readonly sse = new Sse(this);
	public readonly lights = new LightManager(this);
	public readonly devices = new DeviceManager(this);
	public readonly rooms = new RoomManager(this);
	public readonly zones = new ZoneManager(this);
	public readonly groupedLights = new GroupedLightManager(this);
	public readonly devicePowers = new DevicePowerManager(this);
	public readonly scenes = new SceneManager(this);
	public readonly motions = new MotionManager(this);

	public constructor(options: BridgeOptions) {
		super();
		this.options = options;
	}

	get _url(): string {
		if ('ip' in this.options.connection) return `https://${this.options.connection.ip}:443`;
		else return `https://api.meethue.com/route`;
	}

	public async connect(): Promise<void> {
		const data = await this.rest.get('/resource');

		for (const resource of data) {
			this._create(resource);
		}

		await this.sse.connect();

		this.emit(Events.Ready, this);
	}

	public _create(data: any): NarrowResource | undefined {
		if (data.type === ResourceType.Light) return this.lights._add(data);
		else if (data.type === ResourceType.Device) return this.devices._add(data);
		else if (data.type === ResourceType.Room) return this.rooms._add(data);
		else if (data.type === ResourceType.Zone) return this.zones._add(data);
		else if (data.type === ResourceType.GroupedLight) return this.groupedLights._add(data);
		else if (data.type === ResourceType.DevicePower) return this.devicePowers._add(data);
		else if (data.type === ResourceType.Scene) return this.scenes._add(data);
		else if (data.type === ResourceType.Motion) return this.motions._add(data);
	}
}
