import { createXy, XyPoint } from './xy';

/**
 * RGB
 */
export interface RGB {
	red: number;
	green: number;
	blue: number;
}

/**
 * Converts an {@link XyPoint} to {@link RGB}
 * @param point
 */
export function toRGB(point: XyPoint): RGB {
	const bri = point.z || 100;

	const Y = bri || 1;
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
		red: Math.round(red * 255),
		green: Math.round(green * 255),
		blue: Math.round(blue * 255),
	};
}

/**
 * Converts {@link RGB} to an {@link XyPoint}
 * @param rgb
 */
export function fromRGB(rgb: RGB): XyPoint {
	const red = rgb.red / 255;
	const green = rgb.green / 255;
	const blue = rgb.blue / 255;

	const r = red > 0.04045 ? Math.pow((red + 0.055) / (1.0 + 0.055), 2.4) : red / 12.92;
	const g = green > 0.04045 ? Math.pow((green + 0.055) / (1.0 + 0.055), 2.4) : green / 12.92;
	const b = blue > 0.04045 ? Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4) : blue / 12.92;

	const x = r * 0.664511 + g * 0.154324 + b * 0.162028;
	const y = r * 0.283881 + g * 0.668433 + b * 0.047685;
	const z = r * 0.000088 + g * 0.07231 + b * 0.986039;

	return createXy(x / (x + y + z), y / (x + y + z), y * 100);
}
