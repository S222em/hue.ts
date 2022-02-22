import EventSource from 'eventsource';
import { ApiEventStream } from '../../api';
import type { Bridge } from './Bridge';

export class Event extends EventSource {
	private readonly bridge: Bridge;

	constructor(bridge: Bridge, ip: string, applicationKey: string) {
		super(ApiEventStream.route(ip), {
			https: { rejectUnauthorized: false },
			headers: {
				'hue-application-key': applicationKey,
			},
		});
		this.bridge = bridge;
	}

	onmessage = (message: MessageEvent) => {
		const data = JSON.parse(message.data) as ApiEventStream.Event;
		data.forEach((event) => {
			const deviceType = String(event.data[0].type).replaceAll('_', '');
			const eventType = String(event.type);

			const action = this.bridge.actions[deviceType + eventType];
			if (typeof action === 'function') action(this.bridge, event.data[0]);
		});
	};
}
