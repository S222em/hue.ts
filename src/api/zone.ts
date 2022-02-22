import type { DeepPartial } from '../types/DeepPartial';

export namespace ApiZone {
	export function route(id?: string) {
		return `/resource/zone${id ? `/${id}` : ''}`;
	}

	export interface Object {
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

	export type Get = Object[];
	export type Put = DeepPartial<Object>;
}
