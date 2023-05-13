import { NamedResource } from './NamedResource';
import { ApiResourceType } from '../api/ApiResourceType';
import { ResourceIdentifier } from '../api/ResourceIdentifier';
import { NarrowResource } from './Resource';

export interface RoomEditOptions {
	name?: string;
	children?: ResourceIdentifier[];
}

export class Room extends NamedResource<ApiResourceType.Room> {
	type = ApiResourceType.Room;

	get children(): NarrowResource[] {
		return this.bridge.resources.getByIdentifiers(this.childIdentifiers);
	}

	get childIdentifiers(): ResourceIdentifier[] {
		return this.data.children;
	}

	get services(): NarrowResource[] {
		return this.bridge.resources.getByIdentifiers(this.serviceIdentifiers);
	}

	get serviceIdentifiers(): ResourceIdentifier[] {
		return this.data.services;
	}

	public async addChildren(...children: ResourceIdentifier[]) {
		const newChildren = [...this.childIdentifiers, ...children];

		await this.edit({ children: newChildren });
	}

	public async edit(options: RoomEditOptions): Promise<void> {
		await this._put({ metadata: options.name ? { name: options.name } : undefined, children: options.children });
	}
}
