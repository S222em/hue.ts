import { ApiColor, ApiColorTemperature, ApiConnectedResource, ApiDimming, ApiGradient, ApiOn } from './common';

export interface ApiSceneAction {
	target?: ApiConnectedResource;
	action?: {
		on?: ApiOn;
		dimming?: ApiDimming;
		color?: ApiColor;
		color_temperature?: ApiColorTemperature;
		gradient?: ApiGradient;
	};
}
