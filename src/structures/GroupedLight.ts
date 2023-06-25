import { Resource } from './Resource';
import { ResourceType } from '../api/ResourceType';
import { XyPoint } from '../color/xy';
import { GroupedLightManager } from '../managers/GroupedLightManager';

export interface GroupedLightEditOptions {
	on?: boolean;
	brightness?: number;
	mirek?: number;
	xy?: XyPoint;
}

export class GroupedLight extends Resource<ResourceType.GroupedLight> {
	type = ResourceType.GroupedLight;

	get manager(): GroupedLightManager {
		return this.bridge.groupedLights;
	}

	get ownerId(): string {
		return this.data.owner.rid;
	}

	public isOn(): boolean | undefined {
		return this.data.on?.on;
	}

	get brightness(): number | undefined {
		return this.data.dimming?.brightness;
	}

	public async on(): Promise<void> {
		await this.edit({ on: true });
	}

	public async off(): Promise<void> {
		await this.edit({ on: false });
	}

	public async toggle(): Promise<void> {
		await this.edit({ on: !this.isOn() });
	}

	public async setBrightness(brightness: GroupedLightEditOptions['brightness']): Promise<void> {
		await this.edit({ brightness });
	}

	public async setMirek(mirek: GroupedLightEditOptions['mirek']): Promise<void> {
		await this.edit({ mirek });
	}

	public async setXy(xy: GroupedLightEditOptions['xy']): Promise<void> {
		await this.edit({ xy });
	}

	public async edit(options: GroupedLightEditOptions): Promise<void> {
		await this.manager.edit(this.id, options);
	}
}
