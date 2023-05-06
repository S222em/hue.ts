import type { Bridge } from '../bridge/Bridge';

/**
 * Base for all bridge owned objects
 */
export class Base {
	/**
	 * The bridge this Base belongs to
	 */
	public readonly bridge: Bridge;

	public constructor(bridge: Bridge) {
		this.bridge = bridge;
	}
}
