import axios, { AxiosInstance } from 'axios';
import { Agent } from 'https';

export function getRest(ip: string, applicationKey: string): AxiosInstance {
	return axios.create({
		baseURL: `https://${ip}:443/clip/v2`,
		headers: {
			'hue-application-key': applicationKey,
		},
		httpsAgent: new Agent({ rejectUnauthorized: false }),
	});
}
