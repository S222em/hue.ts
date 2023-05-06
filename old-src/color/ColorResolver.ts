import { XyPoint } from './XyPoint';
import type { LightCapabilities } from '../structures/LightCapabilities';

/**
 * MIT License (MIT)
 * Copyright (c) 2014 Benjamin Knight
 * https://github.com/benknight/hue-python-rgb-converter
 * Python code converted to TypeScript and modified for use in this project
 */

const BRIGHTNESS_PERCENTAGE_TO_BRIGHTNESS = 2.54;

export class ColorResolver {
	public capabilities: LightCapabilities;

	constructor(capabilities: LightCapabilities) {
		this.capabilities = capabilities;
	}

	public hexToRgb(hex: string): { r: number; g: number; b: number } {
		if (!hex) return;
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
					r: Number.parseInt(result[1], 16),
					g: Number.parseInt(result[2], 16),
					b: Number.parseInt(result[3], 16),
			  }
			: null;
	}

	public rgbToHex(options: { r: number; g: number; b: number }): string {
		if (!options) return;
		return '#' + ((1 << 24) + (options.r << 16) + (options.g << 8) + options.b).toString(16).slice(1);
	}

	public checkPointInLampsReach(point: XyPoint): boolean {
		const v1 = new XyPoint(
			this.capabilities.green.x - this.capabilities.red.x,
			this.capabilities.green.y - this.capabilities.red.y,
		);
		const v2 = new XyPoint(
			this.capabilities.blue.x - this.capabilities.red.x,
			this.capabilities.blue.y - this.capabilities.red.y,
		);

		const q = new XyPoint(point.x - this.capabilities.red.x, point.y - this.capabilities.red.y);
		const s = ColorResolver.crossPoints(q, v2) / ColorResolver.crossPoints(v1, v2);
		const t = ColorResolver.crossPoints(v1, q) / ColorResolver.crossPoints(v1, v2);

		return s >= 0.0 && t >= 0.0 && s + t <= 1.0;
	}

	public getClosestPointToLine(a: XyPoint, b: XyPoint, c: XyPoint): XyPoint {
		const ac = new XyPoint(c.x - a.x, c.y - a.y);
		const ab = new XyPoint(b.x - a.x, b.y - a.y);

		const ab2 = ab.x * ab.x + ab.y * ab.y;
		const acab = ac.x * ab.x + ac.y * ab.y;
		let t = acab / ab2;

		if (t < 0) t = 0;
		else if (t > 1) t = 1;

		return new XyPoint(a.x + ab.x * t, a.y + ab.y * t);
	}

	public getClosestPoint(point: XyPoint): XyPoint {
		const pab = this.getClosestPointToLine(this.capabilities.red, this.capabilities.green, point);
		const pac = this.getClosestPointToLine(this.capabilities.blue, this.capabilities.red, point);
		const pbc = this.getClosestPointToLine(this.capabilities.green, this.capabilities.blue, point);

		const dab = ColorResolver.getDistanceBetweenPoints(point, pab);
		const dac = ColorResolver.getDistanceBetweenPoints(point, pac);
		const dbc = ColorResolver.getDistanceBetweenPoints(point, pbc);

		let lowest = dab;
		let closestPoint = pab;

		if (dac < lowest) {
			lowest = dac;
			closestPoint = pac;
		}

		if (dbc < lowest) {
			closestPoint = pbc;
		}

		return closestPoint;
	}

	public rgbToXyPoint(options: { r: number; g: number; b: number }): XyPoint {
		if (!options) return;
		const red = options.r / 255;
		const green = options.g / 255;
		const blue = options.b / 255;

		const r = red > 0.04045 ? Math.pow((red + 0.055) / (1.0 + 0.055), 2.4) : red / 12.92;
		const g = green > 0.04045 ? Math.pow((green + 0.055) / (1.0 + 0.055), 2.4) : green / 12.92;
		const b = blue > 0.04045 ? Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4) : blue / 12.92;

		const X = r * 0.664511 + g * 0.154324 + b * 0.162028;
		const Y = r * 0.283881 + g * 0.668433 + b * 0.047685;
		const Z = r * 0.000088 + g * 0.07231 + b * 0.986039;

		let point = new XyPoint(X / (X + Y + Z), Y / (X + Y + Z));

		if (!this.checkPointInLampsReach(point)) {
			point = this.getClosestPoint(point);
		}

		return point;
	}

	public xyPointToRgb(options: { x: number; y: number; brightnessInPercentage: number }): {
		r: number;
		g: number;
		b: number;
	} {
		if (!options) return;
		let point = new XyPoint(options.x, options.y);

		const brightness = options.brightnessInPercentage * BRIGHTNESS_PERCENTAGE_TO_BRIGHTNESS;

		if (!this.checkPointInLampsReach(point)) {
			point = this.getClosestPoint(point);
		}

		const Y = brightness || 1;
		const X = (Y / point.y) * point.x;
		const Z = (Y / point.y) * (1 - point.x - point.y);

		const r = X * 1.656492 - Y * 0.354851 - Z * 0.255038;
		const g = -X * 0.707196 + Y * 1.655397 + Z * 0.036152;
		const b = X * 0.051713 - Y * 0.121364 + Z * 1.01153;

		let red = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, 1.0 / 2.4) - 0.055;
		let green = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, 1.0 / 2.4) - 0.055;
		let blue = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, 1.0 / 2.4) - 0.055;

		if (red < 0) red = 0;
		if (green < 0) green = 0;
		if (blue < 0) blue = 0;

		const maxComponent = Math.max(red, green, blue);
		[red, green, blue] = [red, green, blue].map((x) => x / maxComponent);

		return {
			r: Math.round(red * 255),
			g: Math.round(green * 255),
			b: Math.round(blue * 255),
		};
	}

	private static crossPoints(point1: XyPoint, point2: XyPoint): number {
		return point1.x * point2.y - point1.y * point2.x;
	}

	private static getDistanceBetweenPoints(point1: XyPoint, point2: XyPoint): number {
		const dx = point1.x - point2.x;
		const dy = point1.y - point2.y;

		return Math.sqrt(dx * dx + dy * dy);
	}
}
