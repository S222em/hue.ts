import { Bridge } from '../bridge/Bridge';
import { Agent, Dispatcher, request } from 'undici';
import BodyReadable from 'undici/types/readable';
import { Events } from '../bridge/BridgeEvents';
import { ApiResourceType } from '../api/ApiResourceType';

export const RESOURCES_EVENTS = {
	[ApiResourceType.Device]: [Events.DeviceAdd, Events.DeviceUpdate, Events.DeviceDelete],
	[ApiResourceType.BridgeHome]: undefined,
	[ApiResourceType.Room]: [Events.RoomAdd, Events.RoomUpdate, Events.RoomDelete],
	[ApiResourceType.Zone]: [Events.ZoneAdd, Events.ZoneUpdate, Events.ZoneDelete],
	[ApiResourceType.Light]: [Events.LightAdd, Events.LightUpdate, Events.LightDelete],
	[ApiResourceType.Button]: undefined,
	[ApiResourceType.Temperature]: undefined,
	[ApiResourceType.LightLevel]: undefined,
	[ApiResourceType.Motion]: undefined,
	[ApiResourceType.Entertainment]: undefined,
	[ApiResourceType.GroupedLight]: [Events.GroupedLightAdd, Events.GroupedLightUpdate, Events.GroupedLightDelete],
	[ApiResourceType.DevicePower]: [Events.DevicePowerAdd, Events.DevicePowerUpdate, Events.DevicePowerDelete],
	[ApiResourceType.ZigbeeBridgeConnectivity]: undefined,
	[ApiResourceType.ZgpConnectivity]: undefined,
	[ApiResourceType.Bridge]: undefined,
	[ApiResourceType.Homekit]: undefined,
	[ApiResourceType.Scene]: [Events.SceneAdd, Events.SceneUpdate, Events.SceneDelete],
	[ApiResourceType.EntertainmentConfiguration]: undefined,
	[ApiResourceType.PublicImage]: undefined,
	[ApiResourceType.BehaviourScript]: undefined,
	[ApiResourceType.BehaviourInstance]: undefined,
	[ApiResourceType.Geofence]: undefined,
	[ApiResourceType.GeofenceClient]: undefined,
	[ApiResourceType.Geolocation]: undefined,
};

export class Sse {
	public readonly bridge: Bridge;
	public readonly dispatcher: Agent;
	public connection?: BodyReadable & Dispatcher.BodyMixin;

	constructor(bridge: Bridge) {
		this.bridge = bridge;
		this.dispatcher = new Agent({
			connect: {
				// ca: CA,
				// requestCert: true,
				rejectUnauthorized: false,
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore this will be resolved with https://github.com/nodejs/undici/pull/1362
				checkServerIdentity: () => undefined,
			},
		});
	}

	public debug(message: string) {
		this.bridge.emit(Events.Debug, `[SSE] ${message}`);
	}

	public async connect(): Promise<void> {
		this.connection = undefined;

		const { body, statusCode } = await request(`${this.bridge._url}/eventstream/clip/v2`, {
			method: 'GET',
			headers: {
				Authorization:
					'accessToken' in this.bridge.options.connection
						? `Bearer ${this.bridge.options.connection.accessToken}`
						: undefined,
				'hue-application-key': this.bridge.options.connection.applicationKey,
				Accept: 'text/event-stream',
			},
			bodyTimeout: 0,
			dispatcher: this.dispatcher,
		});

		if (statusCode !== 200) return;

		this.connection = body;
		this.debug('Connected');
		body.setEncoding('utf8');
		body.on('data', (raw) => this.event(raw));
	}

	public async event(raw: string) {
		if (raw === ': hi\n' + '\n') return this.debug('Hi');
		const events = this.parse(raw);

		for (const event of events) {
			this.debug(`Received ${event.data.length} ${event.type} event(s)`);
			for (const data of event.data) {
				switch (event.type) {
					case 'add': {
						this.add(data);
						break;
					}
					case 'update': {
						this.update(data);
						break;
					}
					case 'delete': {
						this.delete(data);
						break;
					}
				}
			}
		}
		this.bridge.emit(Events.Raw, events);
	}

	public add(data: Record<string, any>): void {
		const resource = this.bridge._create(data);
		if (!resource) return;

		this.bridge.emit(Events.Add, resource);

		const event = RESOURCES_EVENTS[resource.type as ApiResourceType];
		if (event) this.bridge.emit(event[0], resource as any);
	}

	public update(data: Record<string, any>): void {
		const resource = this.bridge.cache.get(data.id);
		if (!resource) return;

		const clone = resource._update(data);

		this.bridge.emit(Events.Update, resource, clone);

		const event = RESOURCES_EVENTS[resource.type as ApiResourceType];
		if (event) this.bridge.emit(event[1], resource as any, clone as any);
	}

	public delete(data: Record<string, any>) {
		const resource = this.bridge.cache.get(data.id);
		if (!resource) return;

		const clone = resource._clone();

		this.bridge.cache.delete(data.id);

		this.bridge.emit(Events.Delete, clone);

		const event = RESOURCES_EVENTS[clone.type as ApiResourceType];
		if (event) this.bridge.emit(event[2], clone as any);
	}

	public parse(raw: string): Array<Record<string, any>> {
		const regex = /id: \d+:\d+\ndata: /;

		const replaced = raw.replace(regex, '');

		return JSON.parse(replaced);
	}
}
