import { ResourceManager } from './ResourceManager';
import { Button } from '../structures/Button';
import { APIResourceType } from '../types/api';

/**
 * Manages the button resource
 */
export class ButtonManager extends ResourceManager<Button> {
	type = APIResourceType.Button;
	holds = Button;
}
