import { Resource } from './Resource';

export abstract class NamedResource extends Resource {
	public name: string;

	public _patch(data: { id?: string; metadata?: { name?: string } }) {
		super._patch(data);
		if ('metadata' in data) {
			if ('name' in data.metadata) this.name = data.metadata.name;
		}
	}
}
