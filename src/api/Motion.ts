import { APIResourceType } from './ResourceType';
import { APIResourceIdentifier } from './ResourceIdentifier';
import { MakeSSEUpdateData } from './Update';
import { MakeSSEDeleteData } from './Delete';

export interface APIMotion {
	type: APIResourceType.Motion;
	id: string;
	owner: APIResourceIdentifier;
	enabled: boolean;
	motion: {
		motion: boolean;
		motion_valid: boolean;
	};
}

export type RESTMotionGetResponseData = APIMotion[];

export interface RESTMotionPutPayload {
	type?: APIResourceType.Motion;
	enabled?: boolean;
}

export type SSEMotionAddData = APIMotion;

export type SSEMotionUpdateData = MakeSSEUpdateData<APIMotion>;

export type SSEMotionDeleteData = MakeSSEDeleteData<APIMotion>;
