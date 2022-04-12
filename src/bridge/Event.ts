import EventSource from 'eventsource';
import type { Bridge } from './Bridge';
import { Routes } from '../util/Routes';

/**
 * Event source for updates from the bridge
 * @internal
 */
export class Event extends EventSource {
	private readonly bridge: Bridge;

	constructor(bridge: Bridge, ip: string, applicationKey: string) {
		super(Routes.eventStream(ip), {
			https: { rejectUnauthorized: false },
			headers: {
				'hue-application-key': applicationKey,
			},
		});
		this.bridge = bridge;
	}

	onmessage = (message: MessageEvent) => {
		const data = JSON.parse(message.data);
		data.forEach((event) => {
			const deviceType = String(event.data[0].type).replace(/_/g, '');
			const eventType = String(event.type);

			const action = this.bridge.actions[deviceType + eventType];
			if (typeof action === 'function') action(this.bridge, event.data[0]);
		});
	};
}
