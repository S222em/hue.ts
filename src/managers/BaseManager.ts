import type { Bridge } from '../bridge/Bridge';
import Collection from '@discordjs/collection';

export class BaseManager<Type> {
	protected bridge: Bridge;
	/**
	 * The cache of this manager
	 */
	public cache = new Collection<string, Type>();

	constructor(bridge: Bridge) {
		this.bridge = bridge;
	}
}
