import { Resource } from './Resource';
import { ApiResourceType } from '../types/api/common';
import { ApiGroupedLight } from '../types/api/grouped_light';
import { LightStateOptions } from './Light';

export type GroupedLightResolvable = GroupedLight | 'string';

export type GroupedLightStateOptions = LightStateOptions;

/**
 * Represents a Hue grouped light
 */
export class GroupedLight extends Resource<ApiGroupedLight> {
	public type = ApiResourceType.GroupedLight;

	/**
	 * Edits the on state of all lights to true
	 */
	public async on(): Promise<void> {
		await this.state({ on: true });
	}

	/**
	 * Edits the on state of all lights to false
	 */
	public async off(): Promise<void> {
		await this.state({ on: false });
	}

	/**
	 * Toggles the on state of all lights
	 */
	public async toggle(): Promise<void> {
		await this.state({ on: !this.isOn() });
	}

	/**
	 * Whether a light in the group is on
	 */
	public isOn(): boolean {
		return this.data.on?.on;
	}

	/**
	 * Fetch this grouped light from the bridge
	 */
	public async fetch(): Promise<GroupedLight> {
		return await this.bridge.resources.fetch(this.id, ApiResourceType.GroupedLight);
	}

	/**
	 * Edits the state of this grouped light
	 * @param state
	 * @example
	 * groupedLight.state({ on: true });
	 */
	public async state(state: GroupedLightStateOptions) {
		await this._edit({
			on: { on: state.on ?? true },
		});
	}

	/**
	 * Edits this group light with raw API data structure
	 * @param data
	 * @protected
	 * @internal
	 */
	protected async _edit(data: ApiGroupedLight): Promise<void> {
		await this.bridge.resources._edit(this, data);
	}
}
