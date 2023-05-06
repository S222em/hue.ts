import { ResourceLike } from '../types/common';
import { NamedResource } from './NamedResource';
import { ApiRoom } from '../types/api/room';
import { ApiZone } from '../types/api/zone';
import Collection from '@discordjs/collection';
import { LightResolvable, LightStateOptions } from './Light';

export interface GroupOptions {
	name?: string;
	lights?: LightResolvable;
}

export type GroupStateOptions = LightStateOptions;

/**
 * Base for a Hue room or zone
 */
export abstract class Group<R extends ApiRoom | ApiZone = ApiRoom | ApiZone> extends NamedResource<R> {
	get services(): Collection<string, ResourceLike> {
		return this.bridge.resources.resolveAll(this.serviceIds);
	}

	get serviceIds(): string[] | null {
		return this.data.services?.map?.((service) => service.rid);
	}

	get children(): Collection<string, ResourceLike> {
		return this.bridge.resources.resolveAll(this.childIds);
	}

	get childIds(): string[] | null {
		return this.data.children?.map?.((child) => child.rid);
	}

	public async delete(): Promise<void> {
		await this.bridge.resources._delete(this);
	}

	/**
	 * Edits this group with raw API data structure
	 * @param data
	 * @protected
	 * @internal
	 */
	protected abstract _edit(data: ApiRoom | ApiZone): Promise<void>;
}
