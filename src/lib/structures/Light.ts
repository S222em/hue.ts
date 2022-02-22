import type { TemperatureLight } from './TemperatureLight';
import type { ColorLight } from './ColorLight';
import type { DimmableLight } from './DimmableLight';
import type { GradientLight } from './GradientLight';
import { ResourceType } from './Resource';
import { ApiLight } from '../../api';
import type { Room } from './Room';
import { NamedResource } from './NamedResource';
import type { SceneResolvable } from './Scene';
import { LightCapabilities } from './LightCapabilities';

export type LightResolvable = Light | string;

export class Light extends NamedResource {
	type = ResourceType.Light;
	public capabilities = new LightCapabilities();
	protected _on: boolean;

	public _patch(data: ApiLight.Data): void {
		super._patch(data);
		this.capabilities._patch(data);
		if ('on' in data) this._on = data.on.on;
	}

	get room(): Room {
		return this.bridge.rooms.cache.get(this.roomId);
	}

	get roomId(): string {
		return this.bridge.rooms.cache.find((room) => room.lights.cache.has(this.id))?.id;
	}

	public isOn(): boolean {
		return Boolean(this._on);
	}

	public async toggle(options?: { transition?: number }): Promise<void> {
		await this.edit({ on: { on: !this._on } }, options?.transition);
	}

	public async on(options?: { transition?: number }): Promise<void> {
		await this.edit({ on: { on: true } }, options?.transition);
	}

	public async off(options?: { transition?: number }): Promise<void> {
		await this.edit({ on: { on: false } }, options?.transition);
	}

	public async setState(state: { on?: boolean }, options?: { transition?: number }) {
		await this.edit({ on: { on: state.on } }, options?.transition);
	}

	public async applyScene(resolvable: SceneResolvable, options?: { transition?: number }) {
		const scene = this.bridge.scenes.resolve(resolvable);
		await scene.actions.cache.get(this.id)?.apply(options);
	}

	public isDimmable(): this is DimmableLight | TemperatureLight | ColorLight | GradientLight {
		return Boolean(
			[
				ResourceType.DimmableLight,
				ResourceType.TemperatureLight,
				ResourceType.ColorLight,
				ResourceType.GradientLight,
			].includes(this.type),
		);
	}

	public isTemperature(): this is TemperatureLight | ColorLight | GradientLight {
		return Boolean(
			[ResourceType.TemperatureLight, ResourceType.ColorLight, ResourceType.GradientLight].includes(this.type),
		);
	}

	public isColor(): this is ColorLight | GradientLight {
		return Boolean([ResourceType.ColorLight, ResourceType.GradientLight].includes(this.type));
	}

	public isGradient(): this is GradientLight {
		return Boolean(this.type === ResourceType.GradientLight);
	}

	protected async edit(data: ApiLight.Put, transition: number): Promise<void> {
		await this.bridge.lights.rest.put(ApiLight.route(this.id), {
			...data,
			dynamics: { duration: transition },
			on: { on: data.on?.on ?? true },
		});
	}
}
