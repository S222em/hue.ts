import { Hue } from '../hue/Hue';

/**
 * Base structure for children of hue
 */
export abstract class Base {
	/**
	 * The hue that instantiated this
	 */
	public readonly hue: Hue;

	public constructor(hue: Hue) {
		this.hue = hue;
	}
}
