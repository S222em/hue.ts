import { EventEmitter } from 'node:events';
import { BridgeEvents, Events } from './BridgeEvents';
import { Rest } from '../connections/Rest';
import { ResourceManager } from '../managers/ResourceManager';
import { Sse } from '../connections/Sse';

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

export class Bridge extends EventEmitter {
	public readonly options: BridgeOptions;
	public readonly rest = new Rest(this);
	public readonly sse = new Sse(this);
	public readonly resources = new ResourceManager(this);

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
			this.resources._create(resource);
		}

		await this.sse.connect();

		this.emit(Events.Ready, this);
	}
}
