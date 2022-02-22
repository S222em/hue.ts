import type { DeepPartial } from '../types/DeepPartial';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ApiScene {
	export function route(id?: string) {
		return `/resource/scene${id ? `/${id}` : ''}`;
	}

	export interface Data {
		type?: 'scene';
		id: string;
		id_v1?: string;
		metadata: {
			name: string;
			image?: {
				rid: string;
				rtype: string;
			};
		};
		group: {
			rid: string;
			rtype: string;
		};
		actions: Array<{
			target: {
				rid: string;
				rtype: string;
			};
			action: {
				on: {
					on: boolean;
				};
				dimming?: {
					brightness: number;
				};
				color?: {
					xy: {
						x: number;
						y: number;
					};
				};
				color_temperature?: {
					mirek: number;
				};
				gradient?: {
					points: Array<{
						color: {
							xy: {
								x: number;
								y: number;
							};
						};
					}>;
				};
			};
		}>;
		palette?: {
			color: {
				color: {
					xy: {
						x: number;
						y: number;
					};
				};
				dimming: {
					brightness: number;
				};
			};
			dimming?: {
				brightness: number;
			};
			color_temperature?: {
				mirek: number;
				dimming: {
					brightness: number;
				};
			};
		};
		speed: number;
	}

	export type Get = Data[];
	export type Put = DeepPartial<Data>;
}
