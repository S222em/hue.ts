import type { Bridge } from '../bridge/Bridge';
import type { Resource } from '../structures/Resource';
import { Manager } from './Manager';

export abstract class ResourceManager<R extends Resource<any>> extends Manager<R> {
	/**
	 * The bridge this manager belongs to
	 */
	public readonly bridge: Bridge;

	protected constructor(bridge: Bridge) {
		super();
		this.bridge = bridge;
	}
}
