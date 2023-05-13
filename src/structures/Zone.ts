import { NamedResource } from './NamedResource';
import { ApiResourceType } from '../api/ApiResourceType';
import { ResourceIdentifier } from '../api/ResourceIdentifier';
import { NarrowResource } from './Resource';

export interface ZoneEditOptions {
	name?: string;
	children?: ResourceIdentifier[];
}

export class Zone extends NamedResource<ApiResourceType.Zone> {
	type = ApiResourceType.Zone;

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

	public async removeChildren(...children: ResourceIdentifier[]): Promise<void> {
		const newChildren = this.childIdentifiers.filter((identifier) => !children.includes(identifier));

		await this.edit({ children: newChildren });
	}

	public async addChildren(...children: ResourceIdentifier[]): Promise<void> {
		const newChildren = [...this.childIdentifiers, ...children];

		await this.edit({ children: newChildren });
	}

	public async edit(options: ZoneEditOptions): Promise<void> {
		await this._put({ metadata: options.name ? { name: options.name } : undefined, children: options.children });
	}
}
