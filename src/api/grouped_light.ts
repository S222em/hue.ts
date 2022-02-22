import type { DeepPartial } from '../types/DeepPartial';

export namespace ApiGroupedLight {
	export function route(id?: string) {
		return `/resource/grouped_light${id ? `/${id}` : ''}`;
	}

	export interface Object {
		type?: 'grouped_light';
		id: string;
		id_v1?: string;
		on: {
			on: boolean;
		};
		alert?: {
			// TODO find the actual object for this
			action_values: any[];
		};
	}

	export type Get = Object[];
	export type Put = DeepPartial<Object>;
}
