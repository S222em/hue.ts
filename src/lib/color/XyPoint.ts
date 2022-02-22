export interface XyPointOptions {
	x: number;
	y: number;
}

export class XyPoint {
	public readonly x: number;
	public readonly y: number;

	constructor(options: XyPointOptions) {
		this.x = options.x;
		this.y = options.y;
	}
}
