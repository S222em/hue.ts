import type { Bridge } from '../bridge/Bridge';
import { clone, merge } from '../util/util';
import { Base } from './Base';

/**
 * Base for all resources that hold raw data
 */
export class Data<D extends object> extends Base {
	/**
	 * Raw data received from the API
	 */
	public data: D;

	public constructor(bridge: Bridge, data: D) {
		super(bridge);
		this.data = data;
	}

	/**
	 * Patches this Base with new data received from the API
	 * @param data Data to patch
	 * @internal
	 */
	public _patch(data: D) {
		this.data = merge(this.data ? clone(this.data) : {}, data);
	}

	/**
	 * Clones this Base
	 * @internal
	 */
	public _clone(): this {
		return clone(this);
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
