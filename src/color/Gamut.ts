import type { XyPoint } from './XyPoint';

export interface GamutOptions {
	red: XyPoint;
	green: XyPoint;
	blue: XyPoint;
}

export class Gamut {
	public readonly red: XyPoint;
	public readonly green: XyPoint;
	public readonly blue: XyPoint;

	constructor(options: GamutOptions) {
		this.red = options.red;
		this.green = options.green;
		this.blue = options.blue;
	}
}
