import { Hue } from '../hue/Hue';

export abstract class Base {
	public readonly hue: Hue;

	public constructor(hue: Hue) {
		this.hue = hue;
	}
}
