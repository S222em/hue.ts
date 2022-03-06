import type { Bridge } from '../bridge/Bridge';
import { Util } from '../util/Util';

export class Base<D extends object> {
	public readonly bridge: Bridge;
	public data: D;

	public constructor(bridge: Bridge) {
		this.bridge = bridge;
	}

	public _patch(data: D) {
		this.data = Util.mergeDeep(this.data ? Util.clone(this.data) : {}, data);
	}

	public _clone(): this {
		return Util.clone(this);
	}

	public _update(data: any): this {
		const clone = this._clone();
		this._patch(data);
		return clone;
	}
}
