import { NarrowResource, Resource } from './Resource';
import { ApiResourceType } from '../api/ApiResourceType';
import { ResourceIdentifier } from '../api/ResourceIdentifier';
import { XyPoint } from '../util/color/xy';

export interface GroupedLightEditOptions {
	on?: boolean;
	brightness?: number;
	mirek?: number;
	xy?: XyPoint;
}

export class GroupedLight extends Resource<ApiResourceType.GroupedLight> {
	type = ApiResourceType.GroupedLight;

	get owner(): NarrowResource {
		return this.bridge.resources.getByIdentifier(this.ownerIdentifier);
	}

	get ownerIdentifier(): ResourceIdentifier {
		return this.data.owner;
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
		await this._put({
			on: { on: options.on ?? true },
			dimming: options.brightness ? { brightness: options.brightness } : undefined,
			color_temperature: {
				mirek: options.mirek,
			},
			color: { xy: options.xy ? { x: options.xy.x, y: options.xy.y } : undefined },
		});
	}
}
