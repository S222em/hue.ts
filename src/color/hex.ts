import { XyPoint } from './xy';
import { fromRGB, RGB, toRGB } from './rgb';

export function rgbToHex({ red, green, blue }: RGB) {
	return '#' + ((1 << 24) | (red << 16) | (green << 8) | blue).toString(16).slice(1);
}

export function hexToRgb(hex: string): RGB {
	const parsed = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b);
	if (!parsed) throw new TypeError('Invalid hex');

	return {
		red: parseInt(parsed.substring(1, 3), 16),
		green: parseInt(parsed.substring(3, 5), 16),
		blue: parseInt(parsed.substring(5, 7), 16),
	};
}

export function toHex(point: XyPoint): string {
	const rgb = toRGB(point);

	return rgbToHex(rgb);
}

export function fromHex(hex: string): XyPoint {
	const rgb = hexToRgb(hex);

	return fromRGB(rgb);
}
