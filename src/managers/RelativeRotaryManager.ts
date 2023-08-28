import { ResourceManager } from './ResourceManager';
import { APIResourceType } from '../types/api';
import { RelativeRotary } from '../structures/RelativeRotary';

/**
 * Manages the relative_rotary resource
 */
export class RelativeRotaryManager extends ResourceManager<RelativeRotary> {
	type = APIResourceType.RelativeRotary;
	holds = RelativeRotary;
}
