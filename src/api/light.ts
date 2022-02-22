import type { DeepPartial } from '../types/DeepPartial';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ApiLight {
	export function route(id?: string) {
		return `/resource/light${id ? `/${id}` : ''}`;
	}

	export interface Data {
		type?: 'light';
		id: string;
		id_v1?: string;
		owner: {
			rid: string;
			rtype: string;
		};
		metadata: {
			archetype: string;
			name: string;
		};
		on: {
			on: boolean;
		};
		dimming?: {
			brightness: number;
			min_dim_level: number;
		};
		color_temperature?: {
			mirek: number;
			mirek_valid: boolean;
			mirek_schema: {
				mirek_minimum: number;
				mirek_maximum: number;
			};
		};
		color?: {
			xy: {
				x: number;
				y: number;
			};
			gamut?: {
				red: {
					x: number;
					y: number;
				};
				green: {
					x: number;
					y: number;
				};
				blue: {
					x: number;
					y: number;
				};
			};
			gamut_type: 'A' | 'B' | 'C';
		};
		dynamics?: {
			speed: number;
			status: 'dynamic_palette' | 'none';
			// TODO find the actual object for this
			status_values: any[];
			speed_valid: boolean;
		};
		alert?: {
			// TODO find the actual object for this
			action_values: any[];
		};
		mode: 'normal' | 'streaming';
		gradient?: {
			points: Array<{
				color: {
					xy: {
						x: number;
						y: number;
					};
				};
			}>;
			points_capable: number;
		};
	}

	export type Get = Data[];
	export type Put = DeepPartial<Data>;
}
