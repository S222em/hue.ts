import type { Bridge } from '../bridge/Bridge';
import type { AxiosInstance } from 'axios';
import axiosRateLimit from 'axios-rate-limit';
import type { Resource } from '../structures/Resource';
import { Manager } from './Manager';

export abstract class ResourceManager<R extends Resource<any>> extends Manager<R> {
	public readonly bridge: Bridge;
	public rest: AxiosInstance;

	protected constructor(bridge: Bridge, rateLimitOptions: { maxRequests: number; perMilliseconds: number }) {
		super();
		this.bridge = bridge;
		this.rest = axiosRateLimit(bridge.rest, rateLimitOptions);
	}
}
