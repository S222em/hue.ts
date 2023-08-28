import { Resource } from './Resource';
import { APIDeltaAction, APIResource, APIResourceIdentifier, APIResourceType } from '../types/api';
import { XyPoint } from '../color/xy';

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
	dynamics?: {
		duration?: number;
	};
}

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
	 * @param duration
	 */
	public async on(duration?: number): Promise<string> {
		return await this.edit({ on: true, dynamics: { duration } });
	}

	/**
	 * Turns all lights in this grouped light off
	 * @param duration
	 */
	public async off(duration?: number): Promise<string> {
		return await this.edit({ on: false, dynamics: { duration } });
	}

	/**
	 * Toggles all lights in this grouped light, toggle state is based on majority of lights
	 * @param duration
	 */
	public async toggle(duration?: number): Promise<string> {
		return await this.edit({ on: !this.isOn(), dynamics: { duration } });
	}

	/**
	 * Sets the brightness for all lights in this grouped light
	 * @param brightness
	 * @param duration
	 */
	public async setBrightness(brightness: GroupedLightEditOptions['brightness'], duration?: number): Promise<string> {
		return await this.edit({ brightness, dynamics: { duration } });
	}

	/**
	 * Sets the brightness delta (up action increments, down action decrements) for all lights in this grouped light
	 * @param delta
	 * @param duration
	 */
	public async setBrightnessDelta(
		delta: GroupedLightEditOptions['brightnessDelta'],
		duration?: number,
	): Promise<string> {
		return await this.edit({ brightnessDelta: delta, dynamics: { duration } });
	}

	/**
	 * Sets the color temperature for all lights in this grouped light
	 * @param colorTemperature
	 * @param duration
	 */
	public async setColorTemperature(
		colorTemperature: GroupedLightEditOptions['colorTemperature'],
		duration?: number,
	): Promise<string> {
		return await this.edit({ colorTemperature: colorTemperature, dynamics: { duration } });
	}

	/**
	 * Sets the color temperature delta (up action increments, down action decrements) for all lights in this grouped light
	 * @param delta
	 * @param duration
	 */
	public async setColorTemperatureDelta(
		delta: GroupedLightEditOptions['colorTemperatureDelta'],
		duration?: number,
	): Promise<string> {
		return await this.edit({ colorTemperatureDelta: delta, dynamics: { duration } });
	}

	/**
	 * Sets the color for all lights in this grouped light
	 * @param color
	 * @param duration
	 */
	public async setColor(color: GroupedLightEditOptions['color'], duration?: number): Promise<string> {
		return await this.edit({ color, dynamics: { duration } });
	}

	/**
	 * Edits all lights in this grouped light
	 * @param options
	 */
	public async edit(options: GroupedLightEditOptions): Promise<string> {
		return await this.hue.groupedLights.edit(this.id, options);
	}
}

export interface APIGroupedLight extends APIResource<APIResourceType.GroupedLight> {
	owner: APIResourceIdentifier;
	on?: { on: boolean };
	dimming?: { brightness: number };
	alert: {
		// TODO action_values
		action_values?: string[];
	};
}
