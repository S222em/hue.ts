import type { Bridge } from '../bridge/Bridge';

/**
 * The base for all Structures
 */
export abstract class Base {
	/**
	 * The bridge that this resource belongs too
	 */
	public readonly bridge: Bridge;

	public constructor(bridge: Bridge) {
		this.bridge = bridge;
	}

	/**
	 * Patches the resource with received data
	 * @internal
	 */
	public abstract _patch(data: any): void;

	/**
	 * Clones the resource
	 * @internal
	 */
	public _clone(): this {
		return Object.assign(Object.create(this), this);
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
