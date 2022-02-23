import type { Light } from '../structures/Light';

export class LightResourceManager {
	protected light: Light;

	constructor(light: Light) {
		this.light = light;
	}
}
