import { AsyncQueue } from '@sapphire/async-queue';
import { setTimeout } from 'node:timers';

/**
 * Intervals for routes
 * Default route '/'
 */
export const RequestIntervals: { [key: string]: number } = {
	'/resource/light/': 100,
	'/': 1000,
} as const;

/**
 * Provides rate-limit protection
 */
export class Limit extends AsyncQueue {
	/**
	 * Request per ms
	 */
	public interval: number;

	constructor(route: string) {
		super();
		this.interval = RequestIntervals[route] ?? RequestIntervals['/'];
	}

	/**
	 * Free up the limit for the next item, after x amount of time has passed
	 */
	public shift(): void {
		setTimeout(() => {
			super.shift();
		}, this.interval);
	}
}
