import type { DeepPartial } from '../types/DeepPartial';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ApiGroupedLight {
	export function route(id?: string) {
		return `/resource/grouped_light${id ? `/${id}` : ''}`;
	}

	export interface Data {
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

	export type Get = Data[];
	export type Put = DeepPartial<Data>;
}
