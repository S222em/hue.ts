import { createXy, XyPoint } from './xy';

/**
 * A color gamut
 * Used for defining the maximum range of color a light is able to display
 */
export interface Gamut {
	red: XyPoint;
	green: XyPoint;
	blue: XyPoint;
}

/**
 * Creates a new gamut object
 * @param red
 * @param green
 * @param blue
 */
export function createGamut(red: XyPoint, green: XyPoint, blue: XyPoint): Gamut {
	return { red, green, blue };
}

/**
 * A default gamut type
 * Used as one of the defaults for older lights
 */
export const GAMUT_A = createGamut(createXy(0.704, 0.296), createXy(0.138, 0.08), createXy(0.2151, 0.7106));

/**
 * A default gamut type
 * Used as one of the defaults for older lights
 */
export const GAMUT_B = createGamut(createXy(0.675, 0.322), createXy(0.167, 0.04), createXy(0.4091, 0.518));

/**
 * A default gamut type
 * Used as one of the defaults for older lights
 */
export const GAMUT_C = createGamut(createXy(0.692, 0.308), createXy(0.153, 0.048), createXy(0.17, 0.7));

/**
 * Resolves a gamut object
 * @param type
 */
export function resolveGamutByType(type: 'A' | 'B' | 'C'): Gamut {
	if (type === 'A') return GAMUT_A;
	if (type === 'B') return GAMUT_B;
	if (type === 'C') return GAMUT_C;

	return GAMUT_A;
}
