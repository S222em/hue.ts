import { Manager } from './Manager';
import { APIResourceType } from '../api/ResourceType';
import { Device, DeviceEditOptions } from '../structures/Device';
import { transformMetadataWithArcheType } from '../util/Transformers';

/**
 * Manages the device resource
 */
export class DeviceManager extends Manager<APIResourceType.Device> {
	type = APIResourceType.Device;
	holds = Device;

	/**
	 * Sends an identify request for specified device
	 * This causes the device to blink
	 * @param id
	 */
	public async identify(id: string): Promise<void> {
		await this._put(id, { identify: { action: 'identify' } });
	}

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
	public async edit(id: string, options: DeviceEditOptions): Promise<void> {
		await this._put(id, {
			metadata: transformMetadataWithArcheType(options),
		});
	}

	/**
	 * Deletes specified device
	 * @param id
	 */
	public async delete(id: string): Promise<void> {
		await this._delete(id);
	}
}
