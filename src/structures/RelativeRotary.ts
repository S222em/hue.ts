import { Resource } from './Resource';
import { APIResource, APIResourceIdentifier, APIResourceType } from '../types/api';

/**
 * Represents the relative_rotary resource from the hue API
 */
export class RelativeRotary extends Resource<APIRelativeRotary> {
	type = APIResourceType.RelativeRotary;

	/**
	 * ID of this relative rotaries owner
	 */
	get ownerId(): string {
		return this.data.owner.rid;
	}

	/**
	 * Last occurred action
	 */
	get action(): APIRelativeRotaryAction {
		return this.data.relative_rotary.last_event.action;
	}

	/**
	 * Last occurred turning direction
	 */
	get direction(): APIRelativeRotaryDirection {
		return this.data.relative_rotary.last_event.rotation.direction;
	}

	/**
	 * Last occurred steps (360 degrees = 1000 steps)
	 */
	get steps(): number {
		return this.data.relative_rotary.last_event.rotation.steps;
	}

	/**
	 * Duration of last event
	 */
	get duration(): number {
		return this.data.relative_rotary.last_event.rotation.duration;
	}
}

export enum APIRelativeRotaryAction {
	Start = 'start',
	Repeat = 'repeat',
}

export enum APIRelativeRotaryDirection {
	ClockWise = 'clock_wise',
	CounterClockWise = 'counter_clock_wise',
}

export interface APIRelativeRotary extends APIResource<APIResourceType.RelativeRotary> {
	owner: APIResourceIdentifier;
	relative_rotary: {
		last_event: {
			action: APIRelativeRotaryAction;
			rotation: {
				direction: APIRelativeRotaryDirection;
				steps: number;
				duration: number;
			};
		};
	};
}
