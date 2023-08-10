import { Resource } from './Resource';
import { APIResourceType } from '../api/ResourceType';
import { XyPoint } from '../color/xy';
import { GroupedLightManager } from '../managers/GroupedLightManager';

export interface GroupedLightEditOptions {
	on?: boolean;
	brightness?: number;
	mirek?: number;
	color?: XyPoint;
}

export class GroupedLight extends Resource<APIResourceType.GroupedLight> {
	type = APIResourceType.GroupedLight;

	get manager(): GroupedLightManager {
		return this.hue.groupedLights;
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

	public async on(): Promise<string> {
		return await this.edit({ on: true });
	}

	public async off(): Promise<string> {
		return await this.edit({ on: false });
	}

	public async toggle(): Promise<string> {
		return await this.edit({ on: !this.isOn() });
	}

	public async setBrightness(brightness: GroupedLightEditOptions['brightness']): Promise<string> {
		return await this.edit({ brightness });
	}

	public async setMirek(mirek: GroupedLightEditOptions['mirek']): Promise<string> {
		return await this.edit({ mirek });
	}

	public async setColor(color: GroupedLightEditOptions['color']): Promise<string> {
		return await this.edit({ color });
	}

	public async edit(options: GroupedLightEditOptions): Promise<string> {
		return await this.manager.edit(this.id, options);
	}
}
