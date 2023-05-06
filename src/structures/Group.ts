import { NamedResource } from './NamedResource';
import { ApiResourceType } from '../api/ApiResourceType';
import { Light } from './Light';
import Collection from '@discordjs/collection';
import { Resolvable } from '../managers/ResourceManager';

export interface GroupEditOptions {
	name?: string;
	children?: Array<Resolvable<ApiResourceType.Light>>;
}

export abstract class Group<T extends ApiResourceType.Room | ApiResourceType.Zone> extends NamedResource<T> {
	get children(): Collection<string, Light> {
		const collection = new Collection<string, Light>();

		for (const identifier of this.data.children) {
			const light = this.bridge.resources.resolve(identifier, { type: ApiResourceType.Light });
			if (light) collection.set(light.id, light);
		}

		return collection;
	}

	public async removeChild(resolvable: Resolvable<ApiResourceType.Light>) {
		const light = this.bridge.resources.resolve(resolvable, { force: true, type: ApiResourceType.Light });

		const filtered = this.children.filter((light, key) => key !== light.id);

		const identifiers = filtered.map((light) => light.identifier);
		return await this.edit({ children: identifiers });
	}

	public async edit(options: GroupEditOptions): Promise<void> {
		return await this._put({
			metadata: options.name ? { name: options.name } : undefined,
			children: options.children
				? options.children.map((child) => {
						const light = this.bridge.resources.resolve(child, { force: true, type: ApiResourceType.Light });

						return light.identifier;
				  })
				: undefined,
		});
	}
}
