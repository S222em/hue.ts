import { APIResourceType } from './api';

export type SSEResource<T extends APIResourceType = APIResourceType> = { id: string; type: T } & Record<string, any>;
