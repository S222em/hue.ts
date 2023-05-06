import { EventEmitter } from 'node:events';
import { ActionManager } from './actions/ActionManager';
import { REST } from './rest/REST';
import { SSE } from './SSE';
import { ApiResourceGet } from '../types/api/resource';
import { Events } from '../util/Events';
import { BridgeEvents } from '../types/events';
import { BridgeResourceManager } from '../managers/BridgeResourceManager';
import { ApiResourceLike } from '../types/common';

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
	public rest = new REST(this);
	/**
	 * Event source for updates from the bridge
	 * @internal
	 */
	public sse = new SSE(this);
	public resources = new BridgeResourceManager(this);
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
	}

	/**
	 * Initiates a connection with the bridge and fetches all resources
	 */
	public async connect(): Promise<void> {
		// await this.sse.connect();

		const data = (await this.rest.get('/resource')) as ApiResourceGet;

		data.data.forEach((resource: ApiResourceLike) => this.resources._add(resource));

		this.emit(Events.Ready, this);
	}
}
