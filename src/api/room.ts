import type { DeepPartial } from '../types/DeepPartial';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ApiRoom {
	export function route(id?: string) {
		return `/resource/room${id ? `/${id}` : ''}`;
	}

	export interface Data {
		type?: 'room';
		id: string;
		id_v1?: string;
		services: Array<{
			rid: string;
			rtype: string;
		}>;
		metadata: {
			archetype: string;
			name: string;
		};
		children: Array<{
			rid: string;
			rtype: string;
		}>;
	}

	export type Get = Data[];
	export type Put = DeepPartial<Data>;
}
