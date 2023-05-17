import { NamedResource } from './NamedResource';
import { ApiResourceType } from '../api/ApiResourceType';
import { ResourceIdentifier } from '../api/ResourceIdentifier';

export interface RoomEditOptions {
	name?: string;
	children?: ResourceIdentifier[];
}

export class Room extends NamedResource<ApiResourceType.Room> {
	type = ApiResourceType.Room;

	get children(): ResourceIdentifier[] {
		return this.data.children;
	}

	get services(): ResourceIdentifier[] {
		return this.data.services;
	}

	public async addChildren(...children: ResourceIdentifier[]) {
		const newChildren = [...this.children, ...children];

		await this.edit({ children: newChildren });
	}

	public async edit(options: RoomEditOptions): Promise<void> {
		await this._put({ metadata: options.name ? { name: options.name } : undefined, children: options.children });
	}
}
