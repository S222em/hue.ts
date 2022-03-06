import type { Bridge } from '../bridge/Bridge';
import { Util } from '../util/Util';

/**
 * The base for all Structures
 */
export class Base<D extends object> {
	/**
	 * The bridge that this resource belongs too
	 */
	public readonly bridge: Bridge;

	public data: D;

	public constructor(bridge: Bridge) {
		this.bridge = bridge;
	}

	/**
	 * Patches the resource with received data
	 * @internal
	 */
	public _patch(data: D) {
		this.data = Util.mergeDeep(this.data ? Util.clone(this.data) : {}, data);
	}

	/**
	 * Clones the resource
	 * @internal
	 */
	public _clone(): this {
		return Util.clone(this);
	}

	/**
	 * Clones and Patches this resource
	 * @internal
	 */
	public _update(data: any): this {
		const clone = this._clone();
		this._patch(data);
		return clone;
	}
}
