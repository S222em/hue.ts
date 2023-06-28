import { Rest } from './Rest';
import { AsyncQueue } from '@sapphire/async-queue';
import { setTimeout } from 'node:timers';

export interface RateLimits {
	[key: string]: number;
}

export const RateLimits: RateLimits = {
	'/resource/light/': 100,
} as const;

export class Limit extends AsyncQueue {
	public rateLimit: number;

	constructor(rest: Rest, route: string) {
		super();
		this.rateLimit = RateLimits[route] ?? 1000;
	}

	public shift(): void {
		setTimeout(() => {
			super.shift();
		}, this.rateLimit);
	}
}
