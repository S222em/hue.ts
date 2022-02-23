import { XyPoint } from '../color/XyPoint';
import type { ApiLight } from '../types/api';

const GamutA = {
	red: new XyPoint({
		x: 0.704,
		y: 0.296,
	}),
	blue: new XyPoint({
		x: 0.2151,
		y: 0.7106,
	}),
	green: new XyPoint({
		x: 0.138,
		y: 0.08,
	}),
};

const GamutB = {
	red: new XyPoint({
		x: 0.675,
		y: 0.322,
	}),
	blue: new XyPoint({
		x: 0.4091,
		y: 0.518,
	}),
	green: new XyPoint({
		x: 0.167,
		y: 0.04,
	}),
};

const GamutC = {
	red: new XyPoint({
		x: 0.692,
		y: 0.308,
	}),
	blue: new XyPoint({
		x: 0.17,
		y: 0.7,
	}),
	green: new XyPoint({
		x: 0.153,
		y: 0.048,
	}),
};

/**
 * Represents the capabilities of a Light
 */
export class LightCapabilities {
	/**
	 * The max amount of gradient points the light is able to display
	 */
	public maxGradientPoints?: number;
	/**
	 * The max amount of red intensity the light is able to display
	 */
	public red?: XyPoint;
	/**
	 * The max amount of green intensity the light is able to display
	 */
	public green?: XyPoint;
	/**
	 * The max amount of blue intensity the light is able to display
	 */
	public blue?: XyPoint;
	/**
	 * The max temperature the light is able to display
	 */
	public maxTemperature?: number;
	/**
	 * The min temperature the light is able to display
	 */
	public minTemperature?: number;
	/**
	 * The min brightness level the light is able to display
	 */
	public minBrightnessLevel?: number;

	/**
	 * Patches the resource with received data
	 * @internal
	 */
	public _patch(data: Pick<ApiLight, 'gradient' | 'color' | 'color_temperature' | 'dimming'>) {
		if ('gradient' in data) {
			if ('points_capable' in data.gradient) this.maxGradientPoints = data.gradient.points_capable;
		}
		if ('color' in data) {
			if ('gamut' in data.color) {
				this.red = new XyPoint(data.color.gamut.red);
				this.green = new XyPoint(data.color.gamut.green);
				this.blue = new XyPoint(data.color.gamut.blue);
			} else if ('gamut_type' in data.color) {
				const gamut = data.color.gamut_type === 'A' ? GamutA : data.color.gamut_type === 'B' ? GamutB : GamutC;
				this.red = gamut.red;
				this.green = gamut.green;
				this.blue = gamut.blue;
			}
		}
		if ('color_temperature' in data) {
			if ('mirek_schema' in data.color_temperature) {
				this.maxTemperature = data.color_temperature.mirek_schema.mirek_maximum;
				this.minTemperature = data.color_temperature.mirek_schema.mirek_minimum;
			}
		}
		if ('dimming' in data) {
			if ('min_dim_level' in data.dimming) this.minBrightnessLevel = data.dimming.min_dim_level;
		}
	}
}
