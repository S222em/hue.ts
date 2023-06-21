import { EventEmitter } from 'node:events';
import { BridgeEvents, Events } from './BridgeEvents';
import { Rest } from '../connections/Rest';
import { Sse } from '../connections/Sse';
import { ApiResourceType } from '../api/ApiResourceType';
import { NarrowResource } from '../structures/Resource';
import { Collection } from '@discordjs/collection';
import { Light } from '../structures/Light';
import { XysLight } from '../structures/XysLight';
import { XyLight } from '../structures/XyLight';
import { MirekLight } from '../structures/MirekLight';
import { DimmableLight } from '../structures/DimmableLight';
import { Device } from '../structures/Device';
import { Room } from '../structures/Room';
import { Zone } from '../structures/Zone';
import { GroupedLight } from '../structures/GroupedLight';
import { DevicePower } from '../structures/DevicePower';
import { Scene } from '../structures/Scene';
import { ResourceIdentifier } from '../api/ResourceIdentifier';

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
	emit: <T extends keyof BridgeEvents>(event: T, ...args: BridgeEvents[T]) => boolean;
	off: <T extends keyof BridgeEvents>(event: T, listener: (...args: BridgeEvents[T]) => any) => this;
	removeAllListeners: <T extends keyof BridgeEvents>(event?: T) => this;
}

const ID_REGEX = /\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

export type Force<B extends boolean, T extends ApiResourceType> = B extends true
	? NarrowResource<T>
	: NarrowResource<T> | undefined;

export type By = string | ResourceIdentifier | ResourceIdentifier[];

export class Bridge extends EventEmitter {
	public readonly options: BridgeOptions;
	public readonly rest = new Rest(this);
	public readonly sse = new Sse(this);
	public readonly cache = new Collection<string, NarrowResource>();

	public constructor(options: BridgeOptions) {
		super();
		this.options = options;
	}

	get _url(): string {
		if ('ip' in this.options.connection) return `https://${this.options.connection.ip}:443`;
		else return `https://api.meethue.com/route`;
	}

	public getByIdOrName<B extends boolean>(by: string, force?: B): Force<B, ApiResourceType> {
		return this._get(by, undefined, force);
	}

	public getByIdentifier<B extends boolean, T extends ApiResourceType>(
		by: ResourceIdentifier<T>,
		force?: B,
	): Force<B, T> {
		return this._get(by, by.rtype, force);
	}

	public getLight<B extends boolean>(by: By, force?: B): Force<B, ApiResourceType.Light> {
		return this._get(by, ApiResourceType.Light, force);
	}

	public getDevice<B extends boolean>(by: By, force?: B): Force<B, ApiResourceType.Device> {
		return this._get(by, ApiResourceType.Device, force);
	}

	public getRoom<B extends boolean>(by: By, force?: B): Force<B, ApiResourceType.Room> {
		return this._get(by, ApiResourceType.Room, force);
	}

	public getZone<B extends boolean>(by: By, force?: B): Force<B, ApiResourceType.Zone> {
		return this._get(by, ApiResourceType.Zone, force);
	}

	public getGroupedLight<B extends boolean>(by: By, force?: B): Force<B, ApiResourceType.GroupedLight> {
		return this._get(by, ApiResourceType.GroupedLight, force);
	}

	public getDevicePower<B extends boolean>(by: By, force?: B): Force<B, ApiResourceType.DevicePower> {
		return this._get(by, ApiResourceType.DevicePower, force);
	}

	public getScene<B extends boolean>(by: By, force?: B): Force<B, ApiResourceType.Scene> {
		return this._get(by, ApiResourceType.Scene, force);
	}

	public async connect(): Promise<void> {
		const data = await this.rest.get('/resource');

		for (const resource of data) {
			this._create(resource);
		}

		await this.sse.connect();

		this.emit(Events.Ready, this);
	}

	public _create(data: any) {
		let resource;

		if (data.type === ApiResourceType.Light) {
			if (data.gradient) resource = new XysLight(this, data);
			else if (data.color) resource = new XyLight(this, data);
			else if (data.color_temperature) resource = new MirekLight(this, data);
			else if (data.dimming) resource = new DimmableLight(this, data);
			else resource = new Light(this, data);
		} else if (data.type === ApiResourceType.Device) resource = new Device(this, data);
		else if (data.type === ApiResourceType.Room) resource = new Room(this, data);
		else if (data.type === ApiResourceType.Zone) resource = new Zone(this, data);
		else if (data.type === ApiResourceType.GroupedLight) resource = new GroupedLight(this, data);
		else if (data.type === ApiResourceType.DevicePower) resource = new DevicePower(this, data);
		else if (data.type === ApiResourceType.Scene) resource = new Scene(this, data);

		if (!resource) return;

		this.cache.set(resource.id, resource);

		return resource;
	}

	public _get<B extends boolean, T extends ApiResourceType>(by: By, type?: T, force?: B): Force<B, T> {
		let resource;
		if (Array.isArray(by)) resource = this.cache.get(by.find((identifier) => identifier.rtype == type)?.rid || '');
		else if (typeof by == 'string' && ID_REGEX.test(by)) resource = this.cache.get(by);
		else if (typeof by == 'object') resource = this.cache.find((resource) => resource && resource.id == by.rid);
		else
			resource = this.cache.find(
				(resource) => 'name' in resource && resource.name == by && (type ? resource.isType(type) : true),
			);

		if ((!resource || (type && !resource.isType(type))) && force) throw new Error(`Nonexistent resource: ${by}`);
		else if (type && !resource?.isType?.(type)) return undefined as Force<B, T>;

		return resource as Force<B, T>;
	}
}
