import { APIResource, APIResourceIdentifier, APIResourceType } from '../types/api';
import { Resource } from './Resource';

export enum ButtonLastEvent {
	InitialPress = 'initial_press',
	Repeat = 'repeat',
	ShortRelease = 'short_release',
	LongRelease = 'long_release',
	DoubleShortRelease = 'double_short_release',
	LongPress = 'long_press',
}

export interface APIButton extends APIResource<APIResourceType.Button> {
	onwer: APIResourceIdentifier;
	metadata: {
		control_id: number;
	};
	button: {
		last_event: ButtonLastEvent;
	};
}

/**
 * Represents the button resource from the hue API
 */
export class Button extends Resource<APIButton> {
	type = APIResourceType.Button;

	//todo find out what this is
	get controlId(): number {
		return this.data.metadata.control_id;
	}

	/**
	 * Last event that took place
	 */
	get lastEvent(): ButtonLastEvent {
		return this.data.button.last_event;
	}
}
