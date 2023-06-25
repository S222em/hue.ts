import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { Device, DeviceEditOptions } from '../structures/Device';

export class DeviceManager extends Manager<ResourceType.Device> {
	type = ResourceType.Device;
	holds = Device;

	public async identify(id: string): Promise<void> {
		await this._put(id, { identify: { action: 'identify' } });
	}

	public async edit(id: string, options: DeviceEditOptions): Promise<void> {
		await this._put(id, {
			metadata: {
				name: options.name,
				archetype: options.archeType,
			},
		});
	}

	public async delete(id: string): Promise<void> {
		await this._delete(id);
	}
}
