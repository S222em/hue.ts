import { Resource } from './Resource';
import { APIDeltaAction, APIResource, APIResourceIdentifier, APIResourceType } from '../types/api';
import { XyPoint } from '../color/xy';

export interface APIGroupedLight extends APIResource<APIResourceType.GroupedLight> {
	owner: APIResourceIdentifier;
	on?: { on: boolean };
	dimming?: { brightness: number };
	alert: {
		// TODO action_values
		action_values?: string[];
	};
}

export interface GroupedLightEditOptions {
	on?: boolean;
	brightness?: number;
	brightnessDelta?: {
		action: APIDeltaAction;
		brightness: number;
	};
	colorTemperature?: number;
	colorTemperatureDelta?: {
		action: APIDeltaAction;
		colorTemperature: number;
	};
	color?: XyPoint;
}

//TODO add dynamics (duration)

/**
 * Represents the grouped_light resource from the hue API
 */
export class GroupedLight extends Resource<APIGroupedLight> {
	type = APIResourceType.GroupedLight;

	/**
	 * ID of this grouped light's owner
	 */
	get ownerId(): string {
		return this.data.owner.rid;
	}

	/**
	 * Whether the majority of the lights in this grouped light are on
	 */
	public isOn(): boolean | undefined {
		return this.data.on?.on;
	}

	/**
	 * Average brightness value of all lights in this grouped light
	 */
	get brightness(): number | undefined {
		return this.data.dimming?.brightness;
	}

	/**
	 * Turns all lights in this grouped light on
	 */
	public async on(): Promise<string> {
		return await this.edit({ on: true });
	}

	/**
	 * Turns all lights in this grouped light off
	 */
	public async off(): Promise<string> {
		return await this.edit({ on: false });
	}

	/**
	 * Toggles all lights in this grouped light, toggle state is based on majority of lights
	 */
	public async toggle(): Promise<string> {
		return await this.edit({ on: !this.isOn() });
	}

	/**
	 * Sets the brightness for all lights in this grouped light
	 * @param brightness
	 */
	public async setBrightness(brightness: GroupedLightEditOptions['brightness']): Promise<string> {
		return await this.edit({ brightness });
	}

	/**
	 * Sets the brightness delta (up action increments, down action decrements) for all lights in this grouped light
	 * @param delta
	 */
	public async setBrightnessDelta(delta: GroupedLightEditOptions['brightnessDelta']): Promise<string> {
		return await this.edit({ brightnessDelta: delta });
	}

	/**
	 * Sets the color temperature for all lights in this grouped light
	 * @param colorTemperature
	 */
	public async setColorTemperature(colorTemperature: GroupedLightEditOptions['colorTemperature']): Promise<string> {
		return await this.edit({ colorTemperature: colorTemperature });
	}

	/**
	 * Sets the color temperature delta (up action increments, down action decrements) for all lights in this grouped light
	 * @param delta
	 */
	public async setColorTemperatureDelta(delta: GroupedLightEditOptions['colorTemperatureDelta']): Promise<string> {
		return await this.edit({ colorTemperatureDelta: delta });
	}

	/**
	 * Sets the color for all lights in this grouped light
	 * @param color
	 */
	public async setColor(color: GroupedLightEditOptions['color']): Promise<string> {
		return await this.edit({ color });
	}

	/**
	 * Edits all lights in this grouped light
	 * @param options
	 */
	public async edit(options: GroupedLightEditOptions): Promise<string> {
		return await this.hue.groupedLights.edit(this.id, options);
	}
}
