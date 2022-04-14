import { Routes } from '../../util/Routes';
import { setTimeout } from 'node:timers';

export interface RouteHandlerOptions {
	interval: number;
	maxRequests: number;
}

/**
 * Rate limit manager for a specific route
 * @internal
 */
export class RouteRateLimit {
	public options: RouteHandlerOptions;
	public queue: Array<() => any> = [];
	public timeSlotRequests = 0;
	public timeout: NodeJS.Timeout;

	constructor(route: string) {
		switch (route) {
			case Routes.resource(): {
				this.options = Routes.resourceRateLimit;
				break;
			}
			case Routes.light(): {
				this.options = Routes.lightRateLimit;
				break;
			}
			case Routes.groupedLight(): {
				this.options = Routes.groupedLightRateLimit;
				break;
			}
			case Routes.room(): {
				this.options = Routes.roomRateLimit;
				break;
			}
			case Routes.zone(): {
				this.options = Routes.zoneRateLimit;
				break;
			}
			case Routes.scene(): {
				this.options = Routes.sceneRateLimit;
				break;
			}
		}
	}

	public queueRequest(request: () => any) {
		this.queue.push(request);
		this.next();
	}

	public next() {
		if (this.queue.length === 0) return;
		if (this.timeSlotRequests === this.options.maxRequests) {
			if (this.timeout && typeof this.timeout.ref === 'function') {
				this.timeout.ref();
			}
			return;
		}

		const request = this.queue.shift();
		request();

		if (this.timeSlotRequests === 0) {
			this.timeout = setTimeout(() => {
				this.timeSlotRequests = 0;
				this.next();
			}, this.options.interval * 1000);

			if (typeof this.timeout.unref === 'function') {
				if (this.queue.length === 0) this.timeout.unref();
			}
		}

		this.timeSlotRequests += 1;
	}
}
