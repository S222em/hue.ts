import { Base } from './Base';
import { ApiResourceType } from '../types/api/common';

/**
 * Base for all resources
 */
export abstract class Resource<R extends object & { id?: string }> extends Base<R> {
	/**
	 * The type of this resource
	 */
	public abstract type: ApiResourceType;

	/**
	 * The ID of this resource
	 */
	get id(): string {
		return this.data.id;
	}

	public abstract fetch(): Promise<Resource<any>>;
	protected abstract _edit(options: R): Promise<void>;
}
