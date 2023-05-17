import { NamedResource } from './NamedResource';
import { ApiResourceType } from '../api/ApiResourceType';
import { ResourceIdentifier } from '../api/ResourceIdentifier';

export interface ZoneEditOptions {
	name?: string;
	children?: ResourceIdentifier[];
}

export class Zone extends NamedResource<ApiResourceType.Zone> {
	type = ApiResourceType.Zone;

	get children(): ResourceIdentifier[] {
		return this.data.children;
	}

	get services(): ResourceIdentifier[] {
		return this.data.services;
	}

	public async removeChildren(...children: ResourceIdentifier[]): Promise<void> {
		const newChildren = this.children.filter((child) => !children.includes(child));

		await this.edit({ children: newChildren });
	}

	public async addChildren(...children: ResourceIdentifier[]): Promise<void> {
		const newChildren = [...this.children, ...children];

		await this.edit({ children: newChildren });
	}

	public async edit(options: ZoneEditOptions): Promise<void> {
		await this._put({ metadata: options.name ? { name: options.name } : undefined, children: options.children });
	}
}
