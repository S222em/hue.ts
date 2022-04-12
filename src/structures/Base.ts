import type { Bridge } from '../bridge/Bridge';
import { Util } from '../util/Util';

/**
 * Base for all resources that hold raw data
 */
export class Base<D extends object> {
	/**
	 * The bridge this Base belongs to
	 */
	public readonly bridge: Bridge;
	/**
	 * Raw data received from the API
	 */
	public data: D;

	public constructor(bridge: Bridge) {
		this.bridge = bridge;
	}

	/**
	 * Patches this Base with new data received from the API
	 * @param data Data to patch
	 * @internal
	 */
	public _patch(data: D) {
		this.data = Util.mergeDeep(this.data ? Util.clone(this.data) : {}, data);
	}

	/**
	 * Clones this Base
	 * @internal
	 */
	public _clone(): this {
		return Util.clone(this);
	}

	/**
	 * Clones and patches this Base
	 * @param data Data to patch
	 * @internal
	 */
	public _update(data: any): this {
		const clone = this._clone();
		this._patch(data);
		return clone;
	}
}
