import type { Bridge } from '../bridge/Bridge';

export abstract class Base {
	public readonly bridge: Bridge;

	constructor(bridge: Bridge) {
		this.bridge = bridge;
	}

	public abstract _patch(data: any): void;

	public _clone(): this {
		return Object.assign(Object.create(this), this);
	}

	public _update(data: any): this {
		const clone = this._clone();
		this._patch(data);
		return clone;
	}
}
