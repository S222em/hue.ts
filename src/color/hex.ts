import { XyPoint } from './xy';
import { fromRGB, RGB, toRGB } from './rgb';

/**
 * Converts an {@link RGB} to hex
 * @param rgb
 */
export function rgbToHex(rgb: RGB) {
	return '#' + ((1 << 24) | (rgb.red << 16) | (rgb.green << 8) | rgb.blue).toString(16).slice(1);
}

/**
 * Converts hex to {@link RGB}
 * @param hex
 */
export function hexToRgb(hex: string): RGB {
	const parsed = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b);
	if (!parsed) throw new TypeError('Invalid hex');

	return {
		red: parseInt(parsed.substring(1, 3), 16),
		green: parseInt(parsed.substring(3, 5), 16),
		blue: parseInt(parsed.substring(5, 7), 16),
	};
}

/**
 * Converts an {@link XyPoint} to hex
 * @param point
 */
export function toHex(point: XyPoint): string {
	const rgb = toRGB(point);

	return rgbToHex(rgb);
}

/**
 * Converts hex to an {@link XyPoint}
 * @param hex
 */
export function fromHex(hex: string): XyPoint {
	const rgb = hexToRgb(hex);

	return fromRGB(rgb);
}
