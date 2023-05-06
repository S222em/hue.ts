import { Bridge } from './Bridge';
import { Request, Response } from '../connections/Rest';
import { Light } from '../structures/Light';
import { NarrowResource } from '../structures/Resource';

export const Events = {
	Ready: 'ready',
	Error: 'error',
	Raw: 'raw',
	Debug: 'debug',
	Request: 'request',
	Response: 'response',
	Add: 'add',
	Update: 'update',
	Delete: 'delete',
	LightAdd: 'lightAdd',
	LightUpdate: 'lightUpdate',
	LightDelete: 'lightDelete',
} as const;

export interface BridgeEvents {
	[Events.Ready]: [bridge: Bridge];
	[Events.Error]: [error: Error];
	[Events.Raw]: [data: Record<string, any>];
	[Events.Debug]: [debug: string];
	[Events.Request]: [request: Request];
	[Events.Response]: [response: Response];
	[Events.Add]: [resource: NarrowResource<any>];
	[Events.Update]: [newResource: NarrowResource<any>, oldResource: NarrowResource<any>];
	[Events.Delete]: [NarrowResource<any>];
	[Events.LightAdd]: [light: Light];
	[Events.LightUpdate]: [newLight: Light, oldLight: Light];
	[Events.LightDelete]: [light: Light];
}
