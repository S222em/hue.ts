import { Manager } from './Manager';
import { APIResourceType } from '../api/ResourceType';
import { Device, DeviceEditOptions } from '../structures/Device';
import { createDevicePutPayload } from '../payloads/devicePayload';

/**
 * Manages the device resource
 */
export class DeviceManager extends Manager<APIResourceType.Device> {
	type = APIResourceType.Device;
	holds = Device;

	/**
	 * Edits specified device
	 * @param id
	 * @param options
	 * @example
	 * ```
	 * await hue.devices.edit('some-id', {
	 *     name: 'Awesome new name',
	 * });
	 * ```
	 */
	public async edit(id: string, options: DeviceEditOptions): Promise<string> {
		return await this._put(id, createDevicePutPayload(options));
	}

	/**
	 * Deletes specified device
	 * @param id
	 */
	public async delete(id: string): Promise<string> {
		return await this._delete(id);
	}
}
