import { Hue } from '../hue/Hue';
import { APIResource, APIResourceIdentifier, APIResourceType } from '../types/api';
import { clone } from '../util/clone';
import { merge } from '../util/merge';
import { createResourceIdentifier } from '../util/resourceIdentifier';
import { Base } from './Base';

/**
 * Represents any resource from the hue API
 */
export abstract class Resource<TData extends APIResource = APIResource> extends Base {
	/**
	 * The type of this resource
	 */
	public abstract readonly type: APIResourceType;

	/**
	 * The raw data recieved from the API or SSE
	 */
	public data: TData;

	constructor(hue: Hue, data: TData) {
		super(hue);
		this.data = data;
	}

	/**
	 * ID of this resource
	 */
	get id(): string {
		return this.data.id;
	}

	/**
	 * Identifier of this resource
	 */
	get identifier(): APIResourceIdentifier {
		return createResourceIdentifier(this.id, this.type);
	}

	/**
	 * Whether this resource is a service of specified resource
	 * @param resource
	 *
	 * @example
	 * ```
	 * const button = hue.buttons.cache.first()!;
	 *
	 * const device = hue.devices.cache.find((device) => button.isServiceOf(device))!;
	 * ```
	 */
	public isServiceOf(resource: Resource & { serviceIds: string[] }): boolean {
		return resource.serviceIds.includes(this.id);
	}

	/**
	 * Whether this resource is a child of specified resource
	 * @param resource
	 *
	 * @example
	 * ```
	 * const light = hue.lights.cache.first()!;
	 *
	 * const room = hue.rooms.cache.find((room) => light.isChildOf(room))!;
	 * ```
	 */
	public isChildOf(resource: Resource & { childIds: string[] }): boolean {
		return resource.childIds.includes(this.id);
	}

	/**
	 * Merges .data with data recieved from SSE
	 * @param data
	 */
	public _merge(data: APIResource) {
		return merge<TData>(clone(this.data), data);
	}

	/**
	 * Clones this
	 */
	public _clone(): this {
		return clone(this);
	}

	/**
	 * Updates this with new data recieved from SSE, returns unchanged version
	 * @param data
	 */
	public _update(data: APIResource): this {
		const clone = this._clone();

		this.data = this._merge(data);

		return clone;
	}
}
