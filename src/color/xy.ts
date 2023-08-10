import { Gamut } from './gamut';

/**
 * Used for defining colors
 */
export interface XyPoint {
	x: number;
	y: number;
	z?: number;
}

/**
 * Returns a {@link XyPoint} object
 * @param x
 * @param y
 * @param z
 */
export function createXy(x: number, y: number, z?: number): XyPoint {
	return { x, y, z };
}

/**
 * Does some number magic
 * @param a
 * @param b
 */
export function crossPoints(a: XyPoint, b: XyPoint): number {
	return a.x * b.y - a.y * b.x;
}

/**
 * Checks whether the given {@link XyPoint} is inside the given {@link Gamut}
 * @param point
 * @param gamut
 */
export function checkXyInReach(point: XyPoint, gamut: Gamut): boolean {
	const v1 = createXy(gamut.green.x - gamut.red.x, gamut.green.y - gamut.red.y);
	const v2 = createXy(gamut.blue.x - gamut.red.x, gamut.blue.y - gamut.red.y);

	const q = createXy(point.x - gamut.red.x, point.y - gamut.red.y);
	const s = crossPoints(q, v2) / crossPoints(v1, v2);
	const t = crossPoints(v1, q) / crossPoints(v1, v2);

	return s >= 0.0 && t >= 0.0 && s + t <= 1.0;
}

/**
 * Finds the distance between 2 points
 * @param a
 * @param b
 */
export function getDistanceBetweenXy(a: XyPoint, b: XyPoint): number {
	const dx = a.x - b.x;
	const dy = a.y - b.y;

	return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Finds the closest point from a point to a line
 * @param xy
 * @param a
 * @param b
 */
export function getClosestXyToLine(xy: XyPoint, a: XyPoint, b: XyPoint): XyPoint {
	const xya = createXy(xy.x - a.x, xy.y - a.y);
	const ab = createXy(b.x - a.x, b.y - a.y);

	let t = (xya.x * ab.x + xya.y * ab.y) / (ab.x * ab.x + ab.y * ab.y);

	if (t < 0) t = 0;
	else if (t > 1) t = 1;

	return createXy(a.x + ab.x * t, a.y + ab.y * t);
}

/**
 * Finds the closest point inside a given gamut
 * @param point
 * @param gamut
 */
export function getClosestXy(point: XyPoint, gamut: Gamut): XyPoint {
	const pab = getClosestXyToLine(point, gamut.red, gamut.green);
	const pac = getClosestXyToLine(point, gamut.blue, gamut.red);
	const pbc = getClosestXyToLine(point, gamut.green, gamut.blue);

	const dab = getDistanceBetweenXy(point, pab);
	const dac = getDistanceBetweenXy(point, pac);
	const dbc = getDistanceBetweenXy(point, pbc);

	let lowest = dab;
	let closestPoint = pab;

	if (dac < lowest) {
		lowest = dac;
		closestPoint = pac;
	}

	if (dbc < lowest) {
		closestPoint = pbc;
	}

	if (point.z) closestPoint.z = point.z;

	return closestPoint;
}
