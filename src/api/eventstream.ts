// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ApiEventStream {
	export function route(ip: string) {
		return `https://${ip}:443/eventstream/clip/v2`;
	}

	export interface Data {
		creationtime: string;
		type: 'update' | 'add' | 'delete' | 'error';
		data: Record<string, any>;
	}

	export type Event = Array<Data>;
}
