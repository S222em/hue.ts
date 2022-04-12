import type { GroupedLight } from './GroupedLight';
import type { SceneApplyOptions, SceneResolvable } from './Scene';
import { Scene } from './Scene';
import type { TransitionOptions } from '../types/common';
import { NamedResource } from './NamedResource';
import { ApiRoom } from '../types/api/room';
import { ApiZone } from '../types/api/zone';
import Collection from '@discordjs/collection';
import { Light, LightResolvable } from './Light';
import { GroupEditOptions, groupEditTransformer } from '../transformers/GroupEditTransformer';
import { Room } from './Room';
import { ApiResourceType } from '../types/api/common';
import { Zone } from './Zone';

export interface GroupStateOptions {
	on?: boolean;
	brightness?: number;
	temperature?: number;
	color?: string;
	gradient?: string[];
}

/**
 * Base for a Hue room or zone
 */
export abstract class Group<R extends ApiRoom | ApiZone = ApiRoom | ApiZone> extends NamedResource<R> {
	/**
	 * Connected lights
	 */
	abstract lights: Collection<string, Light>;

	/**
	 * Connected grouped light
	 */
	get groupedLight(): GroupedLight {
		return this.bridge.groupedLights.cache.get(this.groupedLightId);
	}

	/**
	 * Connected grouped light ID
	 */
	get groupedLightId(): string {
		return this.data.services.find((service) => service.rtype === 'grouped_light')?.rid;
	}

	/**
	 * Connected scenes
	 */
	get scenes(): Collection<string, Scene> {
		return this.bridge.scenes.cache.filter((scene) => scene.data.group?.rid === this.id);
	}

	/**
	 * Edits the on state of all lights to true
	 * @param transitionOptions
	 */
	public async on(transitionOptions?: TransitionOptions): Promise<void> {
		await this.state({ on: true }, transitionOptions);
	}

	/**
	 * Edits the on state of all lights to false
	 * @param transitionOptions
	 */
	public async off(transitionOptions?: TransitionOptions): Promise<void> {
		await this.state({ on: false }, transitionOptions);
	}

	/**
	 * Toggles the on state of all lights
	 * @param transitionOptions
	 */
	public async toggle(transitionOptions?: TransitionOptions): Promise<void> {
		await this.state({ on: !this.isOn() }, transitionOptions);
	}

	/**
	 * Edits the state of the group
	 * @param state
	 * @param transitionOptions
	 */
	public async state(state: GroupStateOptions, transitionOptions?: TransitionOptions) {
		for await (const light of this.lights.values()) {
			await light.state(state, transitionOptions);
		}
	}

	/**
	 * Applies a scene to the lights in this group
	 * @param resolvable
	 * @param options
	 */
	public async applyScene(resolvable: SceneResolvable, options?: SceneApplyOptions) {
		const scene = this.bridge.scenes.resolve(resolvable);
		await scene?.apply(options);
	}

	/**
	 * Edits this group with new data e.g. new name
	 * @param options
	 */
	public async edit(options: GroupEditOptions): Promise<void> {
		return this._edit(groupEditTransformer(options, this));
	}

	/**
	 * Adds a new light to this group
	 * @param resolvable
	 */
	public async addLight(resolvable: LightResolvable): Promise<void> {
		const light = this.bridge.lights.resolve(resolvable);
		return await this.edit({ lights: [...this.lights.values(), light] });
	}

	/**
	 * Removes a light from this group
	 * @param resolvable
	 */
	public async removeLight(resolvable: LightResolvable): Promise<void> {
		const light = this.bridge.lights.resolve(resolvable);
		return await this.edit({ lights: [...this.lights.filter((l) => l.id !== light.id).values()] });
	}

	/**
	 * Whether a light in the group is on
	 */
	public isOn(): boolean {
		return this.groupedLight.isOn();
	}

	/**
	 * Whether this group is a room
	 */
	public isRoom(): this is Room {
		return Boolean(this.type === ApiResourceType.Room);
	}

	/**
	 * Whether this group is a zone
	 */
	public isZone(): this is Zone {
		return Boolean(this.type === ApiResourceType.Zone);
	}

	/**
	 * Deletes this group
	 */
	public abstract delete(): Promise<void>;

	/**
	 * Edits this group with raw API data structure
	 * @param data
	 * @protected
	 * @internal
	 */
	protected abstract _edit(data: ApiRoom | ApiZone): Promise<void>;
}
