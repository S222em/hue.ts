import { Base } from './Base';
import { ApiResourceType } from '../types/api/common';

export abstract class Resource<R extends object & { id?: string }> extends Base<R> {
	public abstract type: ApiResourceType;

	get id(): string {
		return this.data.id;
	}

	public abstract fetch(): Promise<Resource<any>>;
}
