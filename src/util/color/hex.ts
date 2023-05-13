import { XyPoint } from './xy';
import { fromRGB, RGB, toRGB } from './rgb';

export function rgbToHex({ red, green, blue }: RGB) {
	return '#' + ((1 << 24) | (red << 16) | (green << 8) | blue).toString(16).slice(1);
}

export function hexToRgb(hex: string): RGB {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (!result) throw new TypeError('Invalid hex');

	return {
		red: parseInt(result[1], 16),
		green: parseInt(result[2], 16),
		blue: parseInt(result[3], 16),
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
