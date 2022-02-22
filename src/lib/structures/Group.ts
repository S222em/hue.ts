import type { ApiRoom } from '../../api';
import { NamedResource } from './NamedResource';
import type { GroupedLight } from './GroupedLight';
import type { SceneResolvable } from './Scene';
import { GroupSceneManager } from '../managers/GroupSceneManager';
import { GroupLightManager } from '../managers/GroupLightManager';

export type GroupResolvable = Group | 'string';

export abstract class Group extends NamedResource {
	public lightIds: Array<string>;
	public groupedLightId: string;
	public scenes: GroupSceneManager = new GroupSceneManager(this);
	public lights: GroupLightManager = new GroupLightManager(this);

	public _patch(data: ApiRoom.Data) {
		super._patch(data);
		if ('services' in data) {
			this.lightIds = data.services.filter((service) => service.rtype === 'light').map((service) => service.rid);
			this.groupedLightId = data.services.find((service) => service.rtype === 'grouped_light')?.rid;
		}
	}

	get groupedLight(): GroupedLight {
		return this.bridge.groupedLights.cache.get(this.groupedLightId);
	}

	public isOn(): boolean {
		return this.groupedLight.isOn();
	}

	public async toggle() {
		await this.groupedLight.toggle();
	}

	public async on() {
		await this.groupedLight.on();
	}

	public async off() {
		await this.groupedLight.off();
	}

	public async setBrightness(brightness: number) {
		for await (const light of this.lights.cache.values()) {
			if (!light.isDimmable()) return;
			await light.setBrightness(brightness);
		}
	}

	public async setTemperature(temperature: number) {
		for await (const light of this.lights.cache.values()) {
			if (!light.isTemperature()) return;
			await light.setTemperature(temperature);
		}
	}

	public async setColor(hex: string) {
		for await (const light of this.lights.cache.values()) {
			if (!light.isColor()) return;
			await light.setColor(hex);
		}
	}

	public async setGradient(gradient: string[]) {
		for await (const light of this.lights.cache.values()) {
			if (!light.isGradient()) return;
			await light.setGradient(gradient);
		}
	}

	public async applyScene(resolvable: SceneResolvable, options?: { transition?: number }) {
		const scene = this.bridge.scenes.resolve(resolvable);
		if (!this.scenes.cache.has(scene.id)) return;
		await scene?.apply(options);
	}

	protected abstract edit(data: ApiRoom.Put): Promise<void>;
}
